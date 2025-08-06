import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  downloadedRecipes: any[] = []
  uploadedImage: string = ""
  user: any = {}
  uploadStatus: any = ''
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("user") || "")
    if (this.user.profile) {
      this.uploadedImage = this.user.profile
    }
    this.getAllDownloadedRecipes()

  }
  getAllDownloadedRecipes() {
    this.api.getAllUserDownloadedRecipesApi().subscribe({
      next: (res: any) => {
        this.downloadedRecipes = res
        console.log(this.downloadedRecipes);

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getFile(event: any) {
    console.log(event.target.files[0]);
    //filereader - to convert file to url
    //create an instance
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0]) //to read the file
    fr.onload = (event: any) => {
      this.uploadedImage = event.target.result
      this.uploadStatus = event.target.result
    }
  }
  upload() {
    if (this.uploadStatus) {
      this.api.updateProfileApi({ "profileImage": this.uploadedImage }).subscribe({
        next: (res: any) => {
          console.log(res);
          sessionStorage.setItem("user", JSON.stringify(res))
          Swal.fire({
            title: 'Aww',
            text: ' Profile uploaded',
            icon: 'success'
          })
        },
        error: (err: any) => {
          console.log(err);
          Swal.fire({
            title: 'Oops',
            text: 'Something went wrong',
            icon: 'error'
          })
        }
      })
    }
    else {
      Swal.fire({
        title: 'Oops',
        text: 'Please upload a profile image',
        icon: 'info'
      })
    }

  }

}
