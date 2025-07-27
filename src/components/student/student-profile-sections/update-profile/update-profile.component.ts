import { Component } from '@angular/core';
import { StudentService } from '../../../../app/services/student/student-service.service';
import { CloudinaryUploadService } from '../../../../app/services/images/cloudinary-upload-service.service';
import { IStudent } from '../../../../app/interfaces/student/istudent';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';import { NgIf } from '@angular/common';
 @Component({
  selector: 'app-update-profile',
  imports: [FormsModule, ReactiveFormsModule,NgIf],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
  constructor(private studentService: StudentService,private cloudinaryService:CloudinaryUploadService) { }

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
  email = "";
  uploadedImageUrl:any

  updateProfileForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required,Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required,Validators.maxLength(50)]),
    phoneNumber: new FormControl('', [Validators.required,Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)]),
    email: new FormControl('', [Validators.required,Validators.email]),
    imageUrl:new FormControl('',[Validators.required,Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/)])
  })

  // Handle input changes
  onInputChange(event: Event, field: string) {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    (this as any)[field] = target.value;
  }
  ngOnInit(): void {
    this.getStudentData()
  }

  getStudentData() {
    this.studentService.getStudentbById().subscribe({
      next: (res) => {
        const [firstName, lastName] = res.fullName?.split(' ') || [];
        this.updateProfileForm.patchValue({
          firstName: firstName || '',
          lastName: lastName || '',
          email: res.email,
          phoneNumber: res.phoneNumber,
          imageUrl:res.imageUrl
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateStudent() {
    if (this.updateProfileForm.invalid) {
      this.updateProfileForm.markAllAsTouched();
      return;
    }
    let student: IStudent = {
      Id: this.studentService.studentId,
      fullName: this.updateProfileForm.get('firstName')?.value + " " + this.updateProfileForm.get('lastName')?.value,
      email: this.updateProfileForm.get('email')?.value,
      phoneNumber: this.updateProfileForm.get('phoneNumber')?.value,
      imageUrl:this.updateProfileForm.get('imageUrl')?.value
    }
    console.log(student);
    this.studentService.updateStudent(student).subscribe({
      next: (res) => {
        console.log(res);
        this.getStudentData()
      },
      error: (err) => {
        console.log(err);
      }
    })
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
