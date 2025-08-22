import { Component } from '@angular/core';
import { StudentService } from '../../../../app/services/student/student-service.service';
import { CloudinaryUploadService } from '../../../../app/services/images/cloudinary-upload-service.service';
import { IStudent } from '../../../../app/interfaces/student/istudent';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../app/Core/Services/account.service';
@Component({
  selector: 'app-update-profile',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
  constructor(
    private studentService: StudentService,
    private cloudinaryService: CloudinaryUploadService,
    private toastr: ToastrService,
    private accountService: AccountService
  ) {
    this.studentId = this.accountService.user()?.userId || '';
  }
  studentId!: string;
  socialLinks = [
    'Website',
    'X(Formerly twitter)',
    'LinkedIn',
    'YouTube',
    'Facebook',
  ];
  // Form fields
  firstName = '';
  lastName = '';
  phoneNumber = '';
  email = '';
  uploadedImageUrl: any;

  updateProfileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    imageUrl: new FormControl('', [
      Validators.required,
      Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/),
    ]),
  });

  // Handle input changes
  onInputChange(event: Event, field: string) {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    (this as any)[field] = target.value;
  }
  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    this.studentService.getStudentbById(this.studentId).subscribe({
      next: (res) => {
        console.log(res);

        const [firstName, lastName] = res.fullName?.split(' ') || [];
        this.updateProfileForm.patchValue({
          firstName: firstName || '',
          lastName: lastName || '',
          email: res.email,
          phoneNumber: res.phoneNumber,
          imageUrl: res.imageUrl,
        });
        this.uploadedImageUrl = res.imageUrl;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateStudent() {
    if (this.updateProfileForm.invalid) {
      this.updateProfileForm.markAllAsTouched();
      return;
    }
    let student: IStudent = {
      id: this.studentId,
      fullName:
        this.updateProfileForm.get('firstName')?.value +
        ' ' +
        this.updateProfileForm.get('lastName')?.value,
      email: this.updateProfileForm.get('email')?.value,
      phoneNumber: this.updateProfileForm.get('phoneNumber')?.value,
      imageUrl: this.updateProfileForm.get('imageUrl')?.value,
    };
    console.log(student);

    this.studentService.updateStudent(student).subscribe({
      next: (res) => {
        this.toastr.success('student updated successfully', 'Success', {
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,
        });
        const value = this.updateProfileForm.value;
        const user = this.accountService.user();
        if (user) {
          const modifiedUser = {
            ...user,
            fullName: value.firstName! + ' ' + value.lastName,
            phoneNumber: value.phoneNumber!,
            pictureUrl: this.uploadedImageUrl,
          };
          this.accountService.user.set(modifiedUser);
          localStorage.setItem('currentUser', JSON.stringify(modifiedUser));
        }
        console.log(res);
        this.getStudentData();
      },
      error: (err) => {
        this.toastr.error('something went wrong', 'Failed', {
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
        });
        console.log(err);
      },
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.cloudinaryService.uploadImage(file).subscribe({
        next: (res: any) => {
          this.uploadedImageUrl = res.secure_url;
          this.updateProfileForm.patchValue({ imageUrl: res.secure_url });
        },
        error: (err) => console.error(err),
      });
    }
  }
}
