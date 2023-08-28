import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../Service/auth.service";
// import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
  amount!: string;
  totalPrice: any;
  constructor(private userSer: AuthService,
    public route: ActivatedRoute, private router: Router
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const subject = params['subject'];
      const id = params['id'];
      if (subject == '4W') {
        this.amount = '100'
      }
      if (subject == '2W') {
        this.amount = '50'
      }
      console.log(this.amount, '+++++++')
    });


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
  }
  convert(amount: any) {
    this.totalPrice = amount * 100
    return this.totalPrice;
  }
  ckeck() {
    console.log(this.amount)
    this.options.amount = this.convert(this.amount)//paise
    this.options.prefill.name = "abc";
    this.options.prefill.email = "abc";
    this.options.prefill.contact = "12212121";

    let rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    })
  }

}
