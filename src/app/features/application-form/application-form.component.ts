import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadService } from '../../core/services/file-upload.service';
import { InstructorApplicationService } from '../../core/services/instructor-application.service';
import { SuccessComponent } from '../../Shared/success/success.component';

@Component({
  selector: 'app-application-form',
  imports: [ReactiveFormsModule,SuccessComponent],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.css'
})
export class ApplicationFormComponent {
  cvUrl: string = '';
  isSubmited=signal<boolean>(false)
  cvUploadError: string | null = null;
  fileService=inject(FileUploadService)
  instructorApplicationService=inject(InstructorApplicationService)
  fb=inject(FormBuilder)
  applicationForm=this.fb.group({
    fullName:['',Validators.required,Validators.maxLength(50),Validators.minLength(3)],
    email:['',Validators.required,Validators.email],
    phone:['',Validators.required,Validators.pattern(/^\+?[0-9]{10,15}$/)],
    specialization:['',Validators.required]
  })

  specializationsList: string[] = [
  'Web Development',
  'Astrology',
  'Physics',
  'Marketing',
  'Data Science',
  'Economics'
];


  onSubmit(){
     if (!this.cvUrl) {
      this.cvUploadError = 'Please upload your CV before submitting ';
      return;
     }
    const dto={
      fullName:this.applicationForm.value.fullName,
      email:this.applicationForm.value.email,
      phone:this.applicationForm.value.phone,
      specialization:this.applicationForm.value.specialization,
      cvUrl:this.cvUrl,
      notes:'under reviewing'
    }
    console.log(dto)
    this.instructorApplicationService.addApplication(dto).subscribe({
      next:()=>this.isSubmited.set(true)
    })
  }




   onCvSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      this.cvUploadError = 'Only PDF or Word files are allowed.';
      return;
    }

    this.fileService.uploadFile(file).subscribe({
      next: (res) => {
        this.cvUrl = res.cvUrl;
        this.cvUploadError = null;
      }
    });
  }
}
