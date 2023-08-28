import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from "../Service/auth.service";
declare var Razorpay: any;
@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
  providers: [DatePipe]
})
export class SlotsComponent implements OnInit {
  vehicleType!: string;
  timeFrom!: string;
  timeTo!: string;
  slots!: any[];
  selectedSubject: any;
  data: any;
  totalSlots: any;
  Id: any[] = [];
  slot_id: any;
  vehical: any;
  userid: any;
  amount!: string;
  totalPrice: any;
  today: any;
  transactionId: any;
  constructor(public userService: AuthService, private http: HttpClient, public router: Router, private date: DatePipe) {
    this.today = this.date.transform(new Date(), 'yyyy-MM-dd');
  }
  ngOnInit(): void {
  }
  parkingForm = new FormGroup({
    vehicleType: new FormControl('', [Validators.required]),
    timefrom: new FormControl('', [Validators.required]),
    timeto: new FormControl('', Validators.required)
  })

  get formData() {
    return this.parkingForm.controls;
  }

  checkAvailability() {
    let formData = this.parkingForm.getRawValue();
    this.userService.checkAvailability(formData)
      .subscribe((res) => {
        console.log(res);
        this.data = res
        this.data.forEach((element: any) => {
          this.Id.push(element._id)
        });
        if (res) {
          this.userService.getSlots(formData.vehicleType)
            .subscribe((res) => {
              console.log(res);
              this.totalSlots = res
              console.log(this.totalSlots)
            })
        }
        if (formData.vehicleType == '4W') {
          this.amount = '100'
        }
        if (formData.vehicleType == '2W') {
          this.amount = '50'
        }
      })
  }
  essage: any = "Not yet stared";
  paymentId = "";
  error = "";
  title = 'angular-razorpay-intergration';
  options = {
    "key": "rzp_test_pyeJr11ulLzEDM",
    "amount": "",
    // "name": "",
    "description": "Web Development",
    "image": "assets/website-assets/images/dashboard/user.png",
    "order_id": "",
    "handler": (response: any) => this.paymentSuccessHandler(response),
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  paymentSuccessHandler(response: any) {
    var event = new CustomEvent("payment.success",
      {
        detail: response,
        bubbles: true,
        cancelable: true
      }
    );
    this.transactionId = response.razorpay_payment_id
    console.log(response.razorpay_payment_id)
    let formData = this.parkingForm.getRawValue();
    this.userid = localStorage.getItem("userId");
    this.userService.confirmTransaction(formData.vehicleType, this.slot_id, this.userid, (this.totalPrice / 100), response.razorpay_payment_id)
      .subscribe((res: any) => {
        if (res.status == true) {
          this.userService.bookSlot(formData, this.slot_id, this.userid)
            .subscribe((res) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your parking is booked',
                showConfirmButton: false,
                timer: 1500
              })
            })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Select the Slot',
          })
        }
      })
  }

  book(id: string) {
    this.slot_id = id;
  }

  convert(Amount: any) {
    this.totalPrice = Amount * 100
    return this.totalPrice;
  }

  Payment() {
    let formData = this.parkingForm.getRawValue();
    const { totalAmount } = this.calculateExtraTimeAndAmount(formData.vehicleType, formData.timefrom, formData.timeto);
    this.options.amount = this.convert(totalAmount)//paise
    this.options.prefill.name = "abc";
    let rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
    })



  }
  calculateExtraTimeAndAmount(vehicleType: any, Time_From: any, Time_to: any) {
    const baseCharge = (vehicleType === '2W') ? 50 : 100; // standard charge based on vehicle type
    const timeDifference = Math.abs((new Date(Time_to).getTime() - new Date(Time_From).getTime())); // time difference in minutes
    const diffInMinute = Math.floor((timeDifference / 1000) / 60);
    const extraTime = Math.round((diffInMinute - 30) / 30); // extra time in minutes
    const totalAmount = baseCharge + (extraTime * 10) // total amount

    return { totalAmount: totalAmount };
  }



}











