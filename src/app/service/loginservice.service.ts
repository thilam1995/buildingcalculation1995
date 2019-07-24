import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from "@angular/common/http";
import { catchError, map, retry } from 'rxjs/operators';
import { PasswordcryptService } from './passwordcrypt.service';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  url: string = "http://localhost:8080/api/account";
  url1: string = "http://localhost:8080/api/login";
  incorrectpassword: boolean = false;
  registermember: Register;
  //private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private currentUserSubject: BehaviorSubject<Register>;
  currentUser: Observable<Register>

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable(); // {2}
  // }
  isLogin: boolean = false;
  constructor(private router: Router, private http: HttpClient, private passworddecrypt: PasswordcryptService,
    private localSt: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<Register>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Register {
    return this.currentUserSubject.value;
  }

  requestresetpassword(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify({
      Email: email
    });
    return this.http.post(this.url + "/forgotpass", body, httpOptions).pipe(retry(3),
      catchError(this.handleError)
    );
  }

  updatepassword(password: string, id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify({
      Password: password
    });
    return this.http.put<Register>(this.url + "/" + `${id}`, body, httpOptions).pipe(retry(3),
      catchError(this.handleError)
    );
  }

  register(register: Register) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(register);
    return this.http.post<Register>(this.url, body, httpOptions).pipe(retry(3),
      catchError(this.handleError)
    );
  }

  login(login: Login) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify({
      Email: login.Email
    });

    return this.http.post<any>(this.url1, body, httpOptions);

  }

  logout() {                            // {4}
    //this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('login');
    this.registermember = null;
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
