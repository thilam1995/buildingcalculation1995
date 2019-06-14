import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn$: Observable<boolean>; 
  constructor(private loginservice: LoginserviceService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.loginservice.isLoggedIn; 
  }

  onLogout(){
    this.loginservice.logout();                      // {3}
  }
}
