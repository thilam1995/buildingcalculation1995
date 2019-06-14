import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  isLogin: boolean = false;
  constructor(private router: Router) { }

  login(login: Login){
    if(login.Email === "admin" && login.Password === "admin1234"){
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
    }
  }
  
  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
