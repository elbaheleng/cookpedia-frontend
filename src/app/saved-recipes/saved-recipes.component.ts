import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saved-recipes',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {
  allSavedRecipes: any[] = []
  constructor(private api: ApiService, private router:Router) { }
  ngOnInit() {
    this.getAllSavedRecipes()
  }

  getAllSavedRecipes() {
    this.api.getAllUserSavedRecipesApi().subscribe({
      next: (res: any) => {
        this.allSavedRecipes = res        
      },
      error: (err: any) => {
        console.log(err);
      },
    })

  }
   viewrecipe(id:string){
    console.log(id);
    
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
    deleteSavedRecipe(id:string){
      this.api.deleteUserSavedRecipeApi(id).subscribe({
      next: (res: any) => {
        this.getAllSavedRecipes()
      },
      error: (err: any) => {
        console.log(err);
      },
    })
    }
}
