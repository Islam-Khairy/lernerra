import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { CloudinaryUploadService } from '../../../../app/services/images/cloudinary-upload-service.service';
import { InstructorService } from '../../../../app/services/instructor/instructor-service.service';
import { updateUserDto, UserInfo } from '../../../../app/Shared/Models/User';
import { AccountService } from '../../../../app/core/services/account.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-profile',
  imports: [SelectModule, ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css'],
  providers: [MessageService],
  standalone: true,
})
export class InstructorProfileComponent {
  fb = inject(FormBuilder);
  instructorService = inject(InstructorService);
  accountService = inject(AccountService);
  cloudinaryService = inject(CloudinaryUploadService);
  messageService = inject(MessageService);
  router = inject(Router);
  profileForm = this.fb.group({
    fullName: ['', Validators.required],
    email: [{ value: '', disabled: true }],
    phone: ['', Validators.required],
    image: [''],
  });

  imageUrl = signal<string>(
    'https://res.cloudinary.com/dnade0nhi/image/upload/v1754849990/DefaultImage_bixccf.jpg'
  );
  userInfo = signal<UserInfo | null>(null);
  isSubmitted = signal<boolean>(false);
  constructor() {
    effect(() => {
      const user = this.accountService.user();
      if (user) {
        this.profileForm.patchValue({
          fullName: user.fullName,
          email: user.email,
          phone: user.phoneNumber,
          image: user.pictureUrl,
        });
      }
    });
  }

  onSubmit() {
    const value = this.profileForm.value;
    const updateDto: updateUserDto = {
      fullName: value.fullName!,
      phoneNumber: value.phone!,
      email: this.accountService.user()?.email!,
      imageUrl: this.imageUrl()
        ? this.imageUrl()!
        : this.accountService.user()?.pictureUrl!,
    };
    console.log(updateDto);
    this.instructorService.updateInstructor(updateDto).subscribe({
      next: () => {
        console.log(this.accountService.user());
        this.messageService.add({
          severity: 'success',
          summary: 'Data Updated',
          detail: 'Data Updated Successfully',
        });
        const user = this.accountService.user();
        if (user) {
          const modifiedUser = {
            ...user,
            fullName: value.fullName!,
            phoneNumber: value.phone!,
            pictureUrl: this.imageUrl(),
          };
          this.accountService.user.set(modifiedUser);
          localStorage.setItem('currentUser', JSON.stringify(modifiedUser));
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Error',
          detail: 'Something went wrong please try again later',
        });
      },
    });
  }

  onImageUpload(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.cloudinaryService.uploadImage(file).subscribe({
      next: (res: any) => {
        console.log('Uploaded URL:', res.secure_url);
        const url: string = res.secure_url;
        this.imageUrl.set(res.secure_url);
      },
    });
  }
}
