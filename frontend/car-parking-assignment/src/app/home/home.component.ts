import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userid: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkSession() {
    this.userid = localStorage.getItem("userId");
    if (this.userid) {

      this.router.navigate(['/dashboard/slot'])
    }
    else {
      this.router.navigate(['/login'])
    }
  }
}
