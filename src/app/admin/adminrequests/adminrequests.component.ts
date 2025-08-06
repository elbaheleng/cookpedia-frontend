import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';

@Component({
  selector: 'app-adminrequests',
  imports: [AdminheaderComponent, AdminsidebarComponent],
  templateUrl: './adminrequests.component.html',
  styleUrl: './adminrequests.component.css'
})
export class AdminrequestsComponent {
  constructor(private api: ApiService) { }
  allTestimonials: any[] = []
  ngOnInit() {
    this.getAllTestimonials()
  }
  getAllTestimonials() {
    this.api.getAllTestimonialsApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allTestimonials = res
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  statusChange(id: any, status: string) {
    console.log(id, status);
    this.api.updateTestimonialStatusApi(id, { status }).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllTestimonials()
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

}
