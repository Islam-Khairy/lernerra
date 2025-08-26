import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
  import { UserService } from './../../../services/admin/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-admin',
  imports: [FormsModule],
templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
adminEmail:string="";

constructor(private userService:UserService, private toastr:ToastrService){}

addAdmin(){
  console.log(this.adminEmail);
  
  this.userService.addAdmin(this.adminEmail).subscribe({
    next:(res)=>{
      console.log(res);
      this.toastr.success(res.message,"Success",{
        progressBar:true,
        progressAnimation:"increasing",
        closeButton:true,
      })
    },
    error:(err)=>{
      console.log(err);
      this.toastr.error(err.error.message,"failed",{
        progressBar:true,
        progressAnimation:"decreasing",
        closeButton:true,
      })
    }
  });
}

}