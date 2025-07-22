import { Component } from '@angular/core';
@Component({
  selector: 'app-update-profile',
  imports: [],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
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
  headline = '';
  description = '';
  language = '';
  imageUrl = '/images/student/image.jpg';
  selectedImageFile: File | null = null;
  socialLinksValues: { [key: string]: string } = {};

  // Handle input changes
  onInputChange(event: Event, field: string) {
    const target = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    (this as any)[field] = target.value;
  }

  // Handle social link input changes
  onSocialLinkChange(event: Event, link: string) {
    const target = event.target as HTMLInputElement;
    this.socialLinksValues[link] = target.value;
  }

  // Handle image file selection and preview
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  // Example: Save image (stub)
  saveImage() {
    if (this.selectedImageFile) {
      // Implement upload logic here
      alert('Image ready to be uploaded!');
    }
  }

  // Example: Validate form (stub)
  isValid() {
    return this.firstName && this.lastName && this.headline && this.language;
  }
}
