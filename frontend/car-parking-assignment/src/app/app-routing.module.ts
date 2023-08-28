import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyDashboasrdComponent } from './my-dashboasrd/my-dashboasrd.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegistrationComponent } from './registration/registration.component';
import { SlotsComponent } from './slots/slots.component';
import { AuthGuard } from './Guards/auth.guard';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'dashboard', component: MyDashboasrdComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'dashboard-stat', component: DashboardComponent },
      { path: 'slot', component: SlotsComponent },
      { path: 'bookings/:id', component: MyBookingsComponent },
    ]
  },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
