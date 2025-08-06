import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private api: ApiService) { }
  HomeRecipe: any = []
  TestimonialsToHome: any = []
  ngOnInit() {
    this.getAllHomeRecipes()
    this.getApprovedTestimonials()
  }
  getAllHomeRecipes() {
    this.api.getHomeRecipesApi().subscribe({
      next: (result: any) => {
        this.HomeRecipe = result
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getApprovedTestimonials() {
    this.api.getAllApprovedTestimonialsApi().subscribe({
      next: (result: any) => {
        this.TestimonialsToHome = result
        console.log(this.TestimonialsToHome);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
