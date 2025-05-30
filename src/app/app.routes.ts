import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {path : '', component: HomeComponent},
    {path : 'register', component: RegisterComponent},
    {path : 'login', component: LoginComponent},
    {path : 'all-recipes', component: RecipeComponent},
    {path : 'about', component: AboutComponent},
    {path : 'contact', component: ContactComponent},
    {path : 'view/:id', component: ViewRecipeComponent},

    {path : '**', component: PagenotfoundComponent},

];
