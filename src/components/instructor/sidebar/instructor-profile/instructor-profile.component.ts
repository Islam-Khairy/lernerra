import { ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder,  Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { CloudinaryUploadService } from '../../../../app/services/images/cloudinary-upload-service.service';
import { InstructorService } from '../../../../app/services/instructor/instructor-service.service';
import { updateUserDto } from '../../../../app/Shared/Models/User';
import { AccountService } from '../../../../app/core/services/account.service';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-instructor-profile',
  imports: [SelectModule, ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css'],
  providers:[MessageService],
  standalone: true
})
export class InstructorProfileComponent {
  fb=inject(FormBuilder)
  instructorService=inject(InstructorService)
  accountService=inject(AccountService)
  cloudinaryService=inject(CloudinaryUploadService)
  messageService=inject(MessageService)
  originalData=signal<any>(null)
  profileForm=this.fb.group({
      fullName: ['', Validators.required],
      email: [{value:'',disabled:true}],
      phone: ['', Validators.required],
      image:['']
    });

    constructor(){
      effect(()=>{
       const user = this.accountService.user();
        if(user){
        const initialData={
           fullName: user.fullName || '',
           email: user.email || '',
           phone: user.phoneNumber || '',
           image: user.pictureUrl || ''
        }
        this.profileForm.patchValue(initialData);
        this.originalData.set(initialData);
        
      }
    })
    }


  imageUrl=signal<string>("")
  onSubmit() {
      const value =this.profileForm.value
      const updateDto:updateUserDto={
        fullName:value.fullName!, 
        phoneNumber:value.phone!,
        email:this.originalData().email!,
        profilePictureUrl:this.imageUrl()? this.imageUrl()! : this.accountService.user()?.pictureUrl!
      }
      console.log(updateDto)
      this.instructorService.updateInstructor(updateDto).subscribe({
        
        next:()=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Data Updated',
            detail: 'Data Updated Successfully'
          });
          const CurrentUser=this.accountService.user()
          if(!CurrentUser) return
          const updatedUser= {...CurrentUser,fullName:updateDto.fullName,phoneNumber:updateDto.phoneNumber,pictureUrl:updateDto.profilePictureUrl}
          console.log(updatedUser)
          this.accountService.user.set(updatedUser);

            const initialData = {
              fullName: updatedUser.fullName || '',
              email: updatedUser.email || '',
              phone: updatedUser.phoneNumber || '',
              image: updatedUser.pictureUrl || ''
            };
          
            this.profileForm.patchValue(initialData);
            this.profileForm.markAsPristine(); 
            this.originalData.set(initialData);
        }
      })
    
  }

  onImageUpload(event:any){
    const file: File = event.target.files[0];
    if (!file) return;


    this.cloudinaryService.uploadImage(file).subscribe({
      next: (res:any) => {
        console.log('Uploaded URL:', res.secure_url);
        const url:string=res.secure_url
        this.imageUrl.set(res.secure_url)
      }
    });
  }

  hasChanges(): boolean {
   const current = this.profileForm.getRawValue();
    const original = this.originalData();
    if(this.imageUrl()){
      return true
    }
  return JSON.stringify(current) !== JSON.stringify(original);
}
  
}