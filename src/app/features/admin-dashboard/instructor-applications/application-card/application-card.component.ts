import { ApplicationInitStatus, Component, input, output } from '@angular/core';
import { ApplicationStatus, instructorApplicationResponse } from '../../../../Shared/Models/InstructorApplication';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Button } from "primeng/button";
import { NgClass } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-application-card',
  imports: [ProgressSpinner, Button,NgClass],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.css'
})
export class ApplicationCardComponent {
  application=input<instructorApplicationResponse>()
  review=output<{isApproved:boolean,id:number|undefined}>()
  status=ApplicationInitStatus

   getStatusString(status: ApplicationStatus|undefined): string {
    if(typeof status==undefined){
      return ApplicationStatus[0]
    }

      return ApplicationStatus[status!];
    
   }
   getCvPath(){
    return environment.apiUrl + this.application()?.cvUrl
   }

   onClick(isApproved:boolean){
    const id=this.application()?.id
    this.review.emit({isApproved,id})
   }
}