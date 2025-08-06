import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-recipe',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  recipeDetails: any = {}
  relatedRecipesDetals: any = []
  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      this.getViewRecipe(res.id)
    })
  }

  getViewRecipe(id: string) {
    this.api.viewRecipeApi(id).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.recipeDetails = res
        // console.log(this.recipeDetails);
        this.relatedRecipes(res.cuisine)

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  relatedRecipes(cuisine: string) {
    this.api.relatedRecipeApi(cuisine).subscribe({
      next: (res: any) => {
        this.relatedRecipesDetals = res
        // console.log(this.relatedRecipesDetals)
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  addSaveRecipe() {
    this.api.saveRecipeApi(this.recipeDetails._id, this.recipeDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "Aww",
          text: "Recipe saved!",
          icon: "success"
        })
      },
      error: (err: any) => {
       // console.log(err);
        if (err.status == 406) {
          Swal.fire({
            title: "Oops",
            text: `${err.error}`,
            icon: "warning"
          })
        } else {
          Swal.fire({
            title: "Oops",
            text: `Something went wrong`,
            icon: "error"
          })
        }

      }
    })
  }

  addDownloadRecipe() {

    this.generatePdf()
    this.api.adddownloadRecipeApi(this.recipeDetails._id, this.recipeDetails).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
          title: "Aww",
          text: "Recipe downloaded!",
          icon: "success"
        })
      },
      error: (err: any) => {
        console.log(err);
        Swal.fire({
          title: "Oops",
          text: `Something went wrong`,
          icon: "error"
        })
      }
    })
  }

  generatePdf() {
    const pdf = new jsPDF()
    pdf.setTextColor('blue')//set color to blue
    pdf.setFontSize(25) // font size setting
    pdf.text(this.recipeDetails.name, 15, 10) //to create text,  margin from x, margin from y
    pdf.setTextColor('green')
    pdf.setFontSize(12)
    pdf.text(`Cuisine: ${this.recipeDetails.cuisine}`, 15, 20)
    pdf.text(`Calories per servings: ${this.recipeDetails.caloriesPerServings}`, 15, 25)
    pdf.text(`Cooking Time: ${this.recipeDetails.cookTimeMinutes}`, 15, 30)
    pdf.text(`Mode of Cooking: ${this.recipeDetails.difficulty}`, 15, 35)
    pdf.text(`Preparation Time: ${this.recipeDetails.prepTimeMinutes}`, 15, 40)
    const head = [['Ingredients', 'Instructions']]
    const body = [[this.recipeDetails.ingredients, this.recipeDetails.instructions]]
    autoTable(pdf, { head, body, startY: 50 })// to create table
    pdf.output('dataurlnewwindow')// open in new tab
    pdf.save(`${this.recipeDetails.name}-recipe.pdf`)//name of the file downloaded
  }
}
