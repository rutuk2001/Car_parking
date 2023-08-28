import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../Service/auth.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  })
  constructor(public userService: AuthService, public router: Router) { }
  get formData() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
  }

  onSubmit() {
    let formData = this.loginForm.getRawValue();
    console.log(formData);
    this.userService.Login(formData)
      .subscribe((res: any) => {
        if (res.status == true) {
          localStorage.setItem("_token", res.token);
          localStorage.setItem("userId", res.userId);
          Swal.fire(
            'Login Successfully'
          )
          this.router.navigate(['/dashboard'])
        }
        if (res.status == false) {
          this.router.navigate(['/login'])
        }
      })
  }
}
