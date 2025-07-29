import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryUploadService {
    private cloudName = 'dnade0nhi';
  private uploadPreset = 'ml_default';
    constructor(private http: HttpClient) {}
     uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData);
  }
}
