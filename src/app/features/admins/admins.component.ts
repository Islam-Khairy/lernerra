import { Component } from '@angular/core';
import { UserService } from './../../services/admin/user-service.service';
import { IStudent } from '../../interfaces/student/istudent';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admins',
  imports: [RouterLink],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
admins!:IStudent[]
  
constructor(private userService:UserService){}

ngOnInit(): void {
  this.getAdmins()
}

getAdmins(){
  this.userService.getAllUsersByRole("Admin").subscribe({
    next:(res)=>{
      console.log(res);
      this.admins=res;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
}
