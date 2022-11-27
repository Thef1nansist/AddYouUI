import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = "http://localhost:65204/api/users/";

  constructor(private http: HttpClient, private router: Router) { }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}`, userObj);
  }

  login(loginrObj: any) {
    return this.http.post<any>(`${this.baseUrl}login`, loginrObj);
  }

  getAsyncUser() {
    return this.http.get<any>(this.baseUrl);
  }

  storeToken(tokenValue: string, isAdmin: boolean) {
    localStorage.setItem('token', tokenValue);
    localStorage.setItem(tokenValue, `${isAdmin}`)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean { 
    console.log(`${this.getToken()}`)
    return !!localStorage.getItem(`${this.getToken()}`);
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
