import { Component } from '@angular/core';
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-adminusers',
  imports: [AdminsidebarComponent, AdminheaderComponent],
  templateUrl: './adminusers.component.html',
  styleUrl: './adminusers.component.css'
})
export class AdminusersComponent {
  allUsers:any = []
constructor(private api:ApiService){}
ngOnInit(){
this.getAllUsers()
}

getAllUsers(){
  this.api.getAllUsersApi().subscribe({
 next:(res:any)=>{
       this.allUsers=res.filter((item:any)=>item.role!='admin')
      // console.log(this.allUsers);
      },
      error:(err:any)=>{
        console.log(err);
      }
  })
}
}
