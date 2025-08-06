import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false
  username: string = ""
  constructor(private router: Router) { }
  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.isLoggedIn = true
      this.username = JSON.parse(sessionStorage.getItem('user') || "").username
    }
  }
  logout() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    this.router.navigateByUrl('/')
  }
}
