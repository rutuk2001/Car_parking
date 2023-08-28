import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    const data = localStorage.getItem("userId");
    if (!data) { return false }
    else { return true }
  }
  register(email: string | null, username: string | null, mobno: string | null, password: string | null) {
    return this.http.post(`${this.apiUrl}/registerUSer`, { email, username, mobno, password });
  }
  Login(data: any) {
    return this.http.post(`${this.apiUrl}/userLogin`, data);
  }
  checkAvailability(data: any) {
    return this.http.post(`${this.apiUrl}/checkAvailability`, data);
  }
  getSlots(vehicleType: any) {
    return this.http.get(`${this.apiUrl}/getSlots/${vehicleType}`);
  }
  bookSlot(data: any, id: any, userId: any) {
    return this.http.post(`${this.apiUrl}/bookSlot/${id}`, { data, userId });
  }
  confirmTransaction(data: any, slot_id: any, userId: any, amount: any, transactionId: any) {
    console.log(amount)
    return this.http.post(`${this.apiUrl}/transaction/${slot_id}`, { data, userId, amount, transactionId });
  }
  getUserData(id: any) {
    return this.http.get(`${this.apiUrl}/getUserData/${id}`);
  }
  getUser(id: any) {
    return this.http.get(`${this.apiUrl}/getUser/${id}`);
  }
  checkout(id: any) {
    return this.http.get(`${this.apiUrl}/checkout/${id}`);
  }
  filter(data: any, userId: any) {
    return this.http.post(`${this.apiUrl}/filter/${userId}`, { data });
  }
}
