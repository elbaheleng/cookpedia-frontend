import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  testimonialForm: FormGroup
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.testimonialForm = fb.group({
      name: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ["", [Validators.required, Validators.email]],
      message: ["", [Validators.required, Validators.pattern('[a-zA-Z .0-9]*')]]
    })
  }

  submitform() {
    if (this.testimonialForm.invalid) {
      Swal.fire({
        title: "Oops",
        text: "Pls fill all fields",
        icon: "info"
      })
    }
    else {
      this.api.addTestimonialApi(this.testimonialForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: "Aww",
            text: "Testimonial added",
            icon: "success"
          })
        },
        error: (err: any) => {
          console.log(err);
          Swal.fire({
            title: "Oops",
            text: "Something went wrong",
            icon: "error"
          })
        }
      })
      this.testimonialForm.reset()
    }
  }
}
