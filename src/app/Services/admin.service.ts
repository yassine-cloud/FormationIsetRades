import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../Interfaces/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient) { }

  // // envirement
  // private url = "http://localhost:3000/login";

  // // function
  // login(email: string, password: string) {
  //   return this.http.post<{ accessToken: string, user: Admin }>(`${this.url}`, { email, password })
  // } 




}
