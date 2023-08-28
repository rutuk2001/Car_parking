import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../Service/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    mobno: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    ), Validators.minLength(8),]),
    confPassword: new FormControl('', [Validators.required, this.confirmPasswordCheck])
  })



  constructor(private userService: AuthService, public router: Router) { }
  get formData() {
    return this.registrationForm.controls;
  }

  ngOnInit(): void {

  }
  onSubmit() {
    let formData = this.registrationForm.getRawValue();
    this.userService.register(formData.email, formData.username, formData.mobno, formData.password)
      .subscribe((res: any) => {
        if (res.status == false) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This Email has already been registerd!!!! try using another email!!',
          })
        }
        else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registered SuccessFully',
            showConfirmButton: false,
            timer: 2000
          })
          this.router.navigate(['/login']);
        }
      })
  }


  confirmPasswordCheck(control: AbstractControl) {
    if (control && control.value !== null || control.value != undefined) {
      const cnfPassword = control.value;
      const passControl = control.root.get('password')

      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfPassword) {
          return {
            isError: true
          }
        }
      }
    }
    return null
  }


}
