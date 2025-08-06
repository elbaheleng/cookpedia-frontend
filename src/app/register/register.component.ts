import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.registerForm = fb.group({
      username: ["", [Validators.required, Validators.pattern('[a-z A-Z]*')]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }
  register() {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Ooh',
        text: 'Invalid input',
        icon: 'info'
      })
    } else {
      this.api.registerApi(this.registerForm.value).subscribe({
        next: (result: any) => {
          console.log(result);
          Swal.fire({
            title: "Aww",
            text: "Registration Successful",
            icon: "success"
          })
        },
        error: (err: any) => {
          console.log(err)
          if (err.status == 401) {
            Swal.fire({
              title: "Oops",
              text: `${err.error}`,
              icon: "warning"
            })
          } else {
            Swal.fire({
              title: "Oops",
              text: `${err.error}`,
              icon: "error"
            })
          }

        }
      })
    }
  }
}
