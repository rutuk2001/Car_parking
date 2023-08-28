import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  userid: any;
  user: any;
  userData: any;
  Years: any[] = [];
  myControl = new FormControl();
  selectedYear: any;
  constructor(private userservice: AuthService) { }
  ngOnInit(): void {
    this.userid = localStorage.getItem("userId");
    this.userservice.getUser(this.userid)
      .subscribe((res) => {
        this.user = res;
        if (res) {
          this.userservice.getUserData(this.userid)
            .subscribe((res) => {
              this.userData = res;
              for (let i = 0; i < this.userData.length; i++) {
                const datePipe = new DatePipe('en-US');
                const inputDate = new Date(this.userData[i].Time_From);
                const year = datePipe.transform(inputDate, 'yyyy');
                this.Years.push(year)
              }
              this.Years = [...new Set(this.Years)]
              console.log(this.Years, "abc")
            })
        }
      })
  }

  filterYear(event: any) {
    this.userid = localStorage.getItem("userId");
    this.selectedYear = event.target.value;
    this.userservice.filter(this.selectedYear, this.userid)
      .subscribe((res: any) => {
        this.userData = res.data
      })
  }
}


