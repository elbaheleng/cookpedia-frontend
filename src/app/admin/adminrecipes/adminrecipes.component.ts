import { Component } from '@angular/core';
import { AdminheaderComponent } from "../adminheader/adminheader.component";
import { AdminsidebarComponent } from "../adminsidebar/adminsidebar.component";
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchPipe } from '../../pipes/search.pipe';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminrecipes',
  imports: [AdminheaderComponent, AdminsidebarComponent, FormsModule, SearchPipe, NgMultiSelectDropDownModule, ReactiveFormsModule],
  templateUrl: './adminrecipes.component.html',
  styleUrl: './adminrecipes.component.css'
})
export class AdminrecipesComponent {
  allRecipes: any[] = []
  searchKey: string = ""
  cuisineType: any = []
  mealType: any = []
  dropdownSettings: IDropdownSettings = {};
  dropdownList: any[] = [];
  selectedItems = [];

  recipeForm: FormGroup

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.recipeForm = fb.group({
      recipename: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      preTime: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      calories: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      serving: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      cookingTime: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      rating: ["", [Validators.required, Validators.pattern('[0-9]*')]],
      modeofcooking: ["", [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      mealType: [[], [Validators.required]],
      cuisineType: ["", [Validators.required]],
      ingredients: [[], [Validators.required]],
      instructions: [[], [Validators.required]],
      image: ["", [Validators.required]]
    })
  }

  ngOnInit() {

    this.getAllRecipes()

    //  this.getdropdown()

    this.dropdownList = [
      { item_id: 1, item_text: 'Dinner' },
      { item_id: 2, item_text: 'Breakfast' },
      { item_id: 3, item_text: 'Snacks' },
      { item_id: 4, item_text: 'Dessert' },
      { item_id: 5, item_text: 'Beverage' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  //   getdropdown(){
  //      this.mealType.forEach((item:any, index:number) =>
  //     this.dropdownList.push({"item_id": index+1, "item_text": item}))
  // console.log(this.dropdownList);
  //  console.log(this.mealType);
  //   }
  onItemSelect(item: any) {
    // console.log(item);
    this.recipeForm.value.mealType.push(item.item_text)
  }
  onSelectAll(items: any) {
    //console.log(items);
    items.forEach((item: any) => {
      this.recipeForm.value.mealType.push(item.item_text)
    })
  }
  onItemDeselect(items: any) {
    //console.log(items);
    this.recipeForm.value.mealType = this.recipeForm.value.mealType.filter((meal: any) => meal != items.item_text)
  }
  onDeselectAll() {

    this.recipeForm.value.mealType = []
  }

  addIngredient(data: any) {
    //console.log(data.value);
    this.recipeForm.value.ingredients.push(data.value)
    data.value = ""
  }
  addInstruction(data: any) {
    //console.log(data.value);
    this.recipeForm.value.instructions.push(data.value)
    data.value = ""
  }
  getFile(event: any) {
    //console.log(event.target.files[0]);
    //filereader - to convert file to url
    //create an instance
    let fr = new FileReader()
    fr.readAsDataURL(event.target.files[0]) //to read the file
    fr.onload = (event: any) => {
      this.recipeForm.value.image = event.target.result
    }
  }


  save() {
    //console.log(this.recipeForm.value);
    const { recipename, preTime, calories, serving, cookingTime, rating, modeofcooking, mealType,
      cuisineType, ingredients, instructions, image } = this.recipeForm.value
    if (!recipename || !preTime || !calories || !serving || !cookingTime || !rating || !modeofcooking || mealType.length == 0 ||
      !cuisineType || ingredients.length == 0 || instructions.length == 0 || !image) {
      Swal.fire({
        title: 'Oops',
        text: ' Fill all details',
        icon: 'info'
      })
    }
    else {
      this.api.addNewRecipeApi(this.recipeForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          Swal.fire({
            title: 'Aww',
            text: 'Recipe added',
            icon: 'success'
          })
          this.getAllRecipes()
        },
        error: (err: any) => {
          console.log(err);

        }
      })
    }

  }
  deleteRecipe(id: any) {
    this.api.deleteRecipeApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        Swal.fire({
            title: 'Aww',
            text: 'Recipe deleted',
            icon: 'success'
          })
        this.getAllRecipes()
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allRecipes = res
        this.allRecipes.forEach((item: any) => {
          if (!this.cuisineType.includes(item.cuisine)) {
            this.cuisineType.push(item.cuisine)
          }
        });
        this.allRecipes.map((item: any) => item.mealType).flat().forEach((item: any) => {
          (!this.mealType.includes(item)) && this.mealType.push(item)
        })
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

}
