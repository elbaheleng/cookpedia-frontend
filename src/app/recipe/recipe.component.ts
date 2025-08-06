import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent, DatePipe,FormsModule, SearchPipe, NgxPaginationModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  constructor(private api: ApiService, private router:Router) { }
  AllRecipe: any = []
  cuisineType: any = []
  mealType: any = []
  dummyArray: any = []
  time:any = new Date()
  searchKey:string = ""
    p: number = 1;


  ngOnInit() {
    this.getAllRecipes()
  }
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe({
      next: (result: any) => {
        this.AllRecipe = result
        this.dummyArray = result
        console.log(this.AllRecipe);
        this.AllRecipe.forEach((item: any) => {
          if (!this.cuisineType.includes(item.cuisine)) {
            this.cuisineType.push(item.cuisine)
          }
        });
        this.AllRecipe.map((item: any) => item.mealType).flat().forEach((item: any) => {
          (!this.mealType.includes(item)) && this.mealType.push(item)
        })
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  filterCuisine(item: any) {
    
    this.AllRecipe = this.dummyArray.filter((recipe: any) => recipe.cuisine == item)
  }
  filterMealType(item:any){
    console.log(item);
    
    this.AllRecipe = this.dummyArray.filter((recipe:any) => recipe.mealType.includes(item))
  //console.log(this.AllRecipe);
  
  }
  nofilter(){
    this.AllRecipe = this.dummyArray
  }
    viewrecipe(id:string){
    const token = sessionStorage.getItem("token")
    if(token){
      this.router.navigateByUrl(`/view/${id}`)
    } else {
      Swal.fire({
            title: "Oops",
            text: `Please login`,
            icon: "info"
      })
          this.router.navigateByUrl(`/login`)

    }
  }

}

