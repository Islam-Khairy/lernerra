import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardNumberComponent } from 'ngx-stripe';
import {
  StripeCardGroupDirective,
  StripeCardCvcComponent,
  StripeCardExpiryComponent,
} from 'ngx-stripe';
import { StripeService } from 'ngx-stripe';
import { ToastModule } from 'primeng/toast';
import { PaymentService } from '../../app/core/services/paymentService/Payment-service.service';
import { MessageService } from 'primeng/api';
import { ICourse } from '../../app/interfaces/course/icourse';
import { CourseService } from '../../app/services/course/course-service.service';

@Component({
  selector: 'app-check-out-page',
  imports: [
    StripeCardNumberComponent,
    StripeCardGroupDirective,
    StripeCardCvcComponent,
    StripeCardExpiryComponent,
    ToastModule,
  ],
  templateUrl: './check-out-page.component.html',
  styleUrl: './check-out-page.component.css',
  standalone: true,
  providers: [MessageService],
})
export class CheckOutPageComponent {
  constructor(
    private http: HttpClient,
    private StripeService: StripeService,
    private cdr: ChangeDetectorRef,
    private payment: PaymentService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {}

  @ViewChild(StripeCardGroupDirective) cardgroup!: StripeCardGroupDirective;
  @ViewChild(StripeCardNumberComponent) card!: StripeCardNumberComponent;

  elementsOptions!: StripeElementsOptions;
  elements: any;
  clientSecret: string = '';
  disableBtn: boolean = false;
  cardHolderName: any;

  courseId!: number;
  course!: ICourse;
  fullduration: number = 0;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: '#0F172A',
        fontSize: '16px',
        '::placeholder': {
          color: '#94A3B8',
        },
        fontFamily: 'inherit',
        padding: '2px',
      },
      invalid: {
        color: '#e3342f',
      },
    },
  };

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const courseFromURL = Number(params['id']);
      this.courseId = courseFromURL;
      console.log('id is', this.courseId);
    });

    this.getCourseDetails();
  }
  ngAfterViewInit() {
    console.log('CardNumber:', this.cardgroup);
    // console.log("CardExpiry:", this.cardExpiry);
    // console.log("CardCvc:", this.cardCvc);
  }
  getCourseDetails() {
    this.courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        console.log('res check', res);
        console.log(res);

        this.course = res.data;
        console.log('cours', this.course);

        console.log(this.course.name);
        console.log(this.course.lessons.length);
        console.log(this.course.description);
        console.log(this.course.instructor.fullName);
        this.durationCalc();
      },
      error: (err) => {
        console.log('error', err);
      },
    });
  }

  durationCalc() {
    this.course.lessons?.forEach((l) => {
      this.fullduration = l.duration + this.fullduration;
    });
    console.log(this.fullduration);
  }

  showMessage(message: string, severityValue: string) {
    this.messageService.add({
      key: 'custom',
      severity: severityValue,
      detail: message,
      life: 5000,
    });
  }

  pay() {
    try {
      this.payment.checkout({ courseID: this.courseId }).subscribe({
        next: (res) => {
          console.log(res);
          this.clientSecret = res.clientSecret;
          if (this.cardgroup) {
            const cardElement =
              this.cardgroup._elements.getElement('cardNumber');
            if (cardElement) {
              const result = this.StripeService.confirmCardPayment(
                this.clientSecret,
                {
                  payment_method: {
                    card: cardElement,
                    billing_details: {
                      name: this.cardHolderName,
                    },
                  },
                }
              ).subscribe({
                next: async (paymentResult) => {
                  console.log(paymentResult);

                  if (paymentResult.error) {
                    // alert(`❌ Payment failed: ${paymentResult.error.message}`);
                    this.showMessage(
                      'Payment failed, Please try again later.',
                      'error'
                    );
                  } else if (
                    paymentResult.paymentIntent?.status === 'succeeded'
                  ) {
                    // alert('✅ Payment succeeded!');
                    this.disableBtn = true;

                    this.showMessage('Payment will be confirmed soon', 'info');

                    setTimeout(() => {
                      this.router.navigate(['/']);
                    }, 3000);
                  }
                },
              });
            }
          }
        },
        error: (err) => {
          this.showMessage(err.error, 'error');
        },
      });
    } catch (err) {
      console.error(err);
      this.showMessage(
        'An error occurred during payment. try again later',
        'error'
      );
    }
  }
}

//   if (this.cardgroup) {
//           const cardElement = this.cardgroup._elements.getElement('cardNumber');
// if(cardElement)
// {
// const result = this.StripeService.confirmCardPayment(res.clientSecret, {
//         payment_method: {
//           card: cardElement,
//           billing_details: {
//             name: this.cardHolderName,
//           }
//         }
//       });
//  if (result) {
//         alert('❌ Payment failed: ' + result.subscribe(res=>{console.log(res)}));

//       } else  {
//         alert('✅ Payment succeeded!');
//       }
// }
//       }

//     } catch (err) {
//       console.error(err);
//       alert('An error occurred during payment.');
//     }
//   }
