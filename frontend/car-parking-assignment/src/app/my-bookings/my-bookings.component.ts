import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from "../Service/auth.service";
declare var Razorpay: any;
@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  userId: any;
  myBookings!: any;
  p: number = 1;
  totalPrice: any;
  constructor(private userService: AuthService,
    public route: ActivatedRoute, private router: Router
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(par => {
      this.userId = par['id']
      this.userService.getUserData(this.userId)
        .subscribe((res) => {
          this.myBookings = res;
        })
    })
  }


  payment(id: any) {
    this.userService.checkout(id)
      .subscribe((res) => {
        if (res) {
          Swal.fire('Checked Out!!!')
          this.router.navigate(['/dashboard/dashboard-stat']);
        }
      })
  }


}
