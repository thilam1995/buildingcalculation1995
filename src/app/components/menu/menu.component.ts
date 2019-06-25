import { Component, OnInit, OnDestroy,  } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Register } from 'src/app/models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  registeruser: Register;
  //isexisted: boolean = false;
  currentUserSubscription: Subscription;
  constructor(private loginservice: LoginserviceService, private router: Router) {
    this.currentUserSubscription = this.loginservice.currentUser.subscribe(x => this.registeruser = x);

  }

  ngOnInit() {
    //this.loginservice.currentUser.subscribe(x => this.registeruser = x);

  }


  logout() {
    this.loginservice.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
}
}
