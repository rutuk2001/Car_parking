import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from "../Service/auth.service";
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  loggedIn!: boolean;
  constructor(private userService: AuthService, public router: Router) { }
  ngOnInit(): void {
    this.loggedIn = this.userService.isLoggedIn();
  }
  signOut() {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'LogOut!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("_token")
        localStorage.removeItem("userId")
        this.router.navigate(['/'])
        Swal.fire(
          'Logged out succesfully',
        )
      }

    })
  }
}
