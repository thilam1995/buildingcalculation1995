import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginserviceService } from '../service/loginservice.service';
import { map, take } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginservice: LoginserviceService, ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const currentUser = this.loginservice.currentUserValue;
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    let islogin = JSON.parse(localStorage.getItem('login'));

    if(islogin){
      if(currentUser){
        return true;
      }
    }
    else{
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

  }
}
