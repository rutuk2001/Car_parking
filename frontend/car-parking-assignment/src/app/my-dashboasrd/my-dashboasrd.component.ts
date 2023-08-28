import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-dashboasrd',
  templateUrl: './my-dashboasrd.component.html',
  styleUrls: ['./my-dashboasrd.component.css']
})
export class MyDashboasrdComponent {
  userid: any;
  constructor(public router: Router) { }

  getUserId() {
    this.userid = localStorage.getItem("userId");
    this.router.navigate([`dashboard/bookings/${this.userid}`]);
  }
}
