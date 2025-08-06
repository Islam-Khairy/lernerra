import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  http=inject(HttpClient)
  private readonly url='http://localhost:5138/api'

  uploadFile(file:File):Observable<{cvUrl:string}>{
    const formData=new FormData();
    formData.append('cv',file)
    return this.http.post<{cvUrl:string}>(this.url+'/instructorapplication/upload',formData)
  }

}
