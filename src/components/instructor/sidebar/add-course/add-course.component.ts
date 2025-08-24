// import { CategoryService } from './../../../../../../src/app/services/category/category-service.service';
import { Component, inject } from '@angular/core';
import { SelectModule } from 'primeng/select';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { CourseService } from '../../../../app/services/course/course-service.service';
import { AccountService } from '../../../../app/core/services/account.service';
import { CloudinaryUploadService } from '../../../../app/services/images/cloudinary-upload-service.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../../app/core/services/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-course',
  imports: [
    ReactiveFormsModule,
    DialogModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    SelectModule,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
})
export class AddCourseComponent {
  categoryService = inject(CategoryService);
  router = inject(Router);
  isSaved: boolean = false;
  selectedLevel: string = '';
  levels = [
    { name: 'Beginner', value: 'beginner' },
    { name: 'Intermediate', value: 'intermediate' },
    { name: 'Advanced', value: 'advanced' },
    { name: 'Expert', value: 'expert' },
  ];

  selectedImage: File | null = null;
  imagePreview: string | null = null;
  courseImageUrl!: string;

  CourseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    currency: new FormControl(''),
    imageUrl: new FormControl('', [Validators.required]),
    instructorId: new FormControl(''),
    categoryId: new FormControl('', [Validators.required]),
  });
  categories: any;

  constructor(
    private courseService: CourseService,
    private accountService: AccountService,
    private cloudService: CloudinaryUploadService,
    private toastr: ToastrService // private categoryService: CategoryService
  ) {}

  removeImage(): void {
    this.selectedImage = null;
    this.imagePreview = null;

    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    // Clear image URL from form & cloud URL if needed
    this.courseImageUrl = '';
    this.CourseForm.patchValue({
      imageUrl: '',
    });
  }

  onCourseImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedImage = file;

      // ⬇️ Show preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);

      // ⬇️ Upload to server/cloud
      this.cloudService.uploadImage(file).subscribe({
        next: (res: any) => {
          console.log(res.secure_url);
          this.toastr.success('Image is uploaded successfully');
          this.courseImageUrl = res.secure_url;

          this.CourseForm.patchValue({
            imageUrl: res.secure_url,
          });
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Image upload failed');
        },
      });
    }
  }

  createCourse() {
    if (this.CourseForm.invalid) {
      this.CourseForm.markAllAsTouched();
      return;
    }
    this.CourseForm.patchValue({
      instructorId: this.accountService.user()?.userId,
      currency: 'USD',
    });
    console.log(this.CourseForm.value);

    this.courseService.createCourse(this.CourseForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/instructor-dashboard']);
        this.toastr.success('Course is uploaded successfully', 'Success', {
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
        });
        this.isSaved = true;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.message, 'Error', {
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
        });
      },
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        console.log(res);
        this.categories = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
