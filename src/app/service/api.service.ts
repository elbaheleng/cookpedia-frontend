import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverurl: string = 'https://cookpedia-backend-0dd3.onrender.com'
  constructor(private http: HttpClient) { 
    
  }

  //api to register
  registerApi(reqBody: any) {
   return this.http.post(`${this.serverurl}/user-register`, reqBody)
  }

  //api to login
  loginApi(reqBody: any) {
   return this.http.post(`${this.serverurl}/user-login`, reqBody)
  }
  //api to het home recipes
  getHomeRecipesApi() {
   return this.http.get(`${this.serverurl}/home-recipes`)
  }

   //api to get all recipes
  getAllRecipesApi() {
   return this.http.get(`${this.serverurl}/all-recipes`)
  }

  appendToken(){
  //create an instance for class HttpHeaders
  let headers = new HttpHeaders()
  const token = sessionStorage.getItem("token")
  //console.log(token);
  
  if(token){
    headers = headers.append("Authorization",`Bearer ${token}`)
  }
 // console.log(headers);
  
  
  return {headers}
   // should be an object, only one because key, value same
}

    //api to view a recipe
  viewRecipeApi(id:string) {
   return this.http.get(`${this.serverurl}/view/${id}`, this.appendToken())
  }

  
    //api to get recipes of given cuisine
  relatedRecipeApi(cuisine:string) {
   return this.http.get(`${this.serverurl}/related-recipes?cuisine=${cuisine}`, this.appendToken() )
  }

    //api to save a recipe
  saveRecipeApi(recipeId:string, reqBody:any) {
   return this.http.post(`${this.serverurl}/save-recipe/${recipeId}`,reqBody, this.appendToken())
  }

   //api to download a recipe
  adddownloadRecipeApi(recipeId:string, reqBody:any) {
   return this.http.post(`${this.serverurl}/download-recipe/${recipeId}`,reqBody, this.appendToken())
  }

     //api to get all user saved recipes
  getAllUserSavedRecipesApi() {
   return this.http.get(`${this.serverurl}/saved-user-recipes`, this.appendToken())
  }

  //api to delete a saved recipe
  deleteUserSavedRecipeApi(id:string) {
     return this.http.delete(`${this.serverurl}/delete-saved-recipe/${id}`)
  }
  //
  
     //api to get all user downloaded recipes
  getAllUserDownloadedRecipesApi() {
   return this.http.get(`${this.serverurl}/downloaded-user-recipes`, this.appendToken())
  }
  //api to update the profile
  updateProfileApi(reqBody:any){
    return this.http.put(`${this.serverurl}/profile-update`, reqBody, this.appendToken())
  }

      //api to get all users for admin
  getAllUsersApi() {
   return this.http.get(`${this.serverurl}/get-all-users`)
  }
  // get all download details
 getAllDownloadsApi() {
   return this.http.get(`${this.serverurl}/get-all-downloads`)
  }


//api to add new recipe
  addNewRecipeApi(reqBody: any) {
   return this.http.post(`${this.serverurl}/add-recipe`, reqBody)
  }

  //api to delete a recipe
  deleteRecipeApi(id:any){
       return this.http.delete(`${this.serverurl}/delete-recipe/${id}`)

  }
  //api to add testimonial
  addTestimonialApi(reqBody: any) {
   return this.http.post(`${this.serverurl}/add-testimonial`, reqBody)
  }

  //api to get all testimonials for admin
  getAllTestimonialsApi() {
   return this.http.get(`${this.serverurl}/get-all-testimonials`)
  }
  //api to update testimonial status
   updateTestimonialStatusApi(id:any,reqBody:any){
    return this.http.put(`${this.serverurl}/update-testimonial/${id}`, reqBody)
  }

  
  //api to get all approved testimonials for home
  getAllApprovedTestimonialsApi() {
   return this.http.get(`${this.serverurl}/get-approved-testimonials`)
  }
  
}


