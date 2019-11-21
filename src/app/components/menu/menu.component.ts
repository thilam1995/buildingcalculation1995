import { Component, OnInit, OnDestroy, OnChanges, } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Observable, Subscription } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { Register } from 'src/app/models/register';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy, OnChanges {

  registeruser: Register;
  //isexisted: boolean = false;
  widthscreen: number = 0;
  ismobile: boolean = false;
  
  currentUserSubscription: Subscription;
  constructor(private loginservice: LoginserviceService, private router: Router,
    private toastr: ToastrService) {
    this.widthscreen = window.screen.width;
    this.setdefault();
    //console.log(this.loginapp);

    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    setTimeout(() => {
      this.currentUserSubscription = this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
          this.registeruser = x;
        }
      });
    },2000);
  }

  ngOnInit() {

  }

  ngOnChanges(){
  }


  logout() {
    this.toastr.warning("You are about to sign out! Please Wait...");
    setTimeout(() => {
      this.loginservice.logout();
      this.router.navigate(['/login']);
    }, 2000);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  setdefault(){
    this.registeruser = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }

  onResize(event) {
    //console.log(event.target.innerWidth);
    this.widthscreen = event.target.innerWidth;
    if(this.widthscreen <= 768){
      this.ismobile = true;
    }else{
      this.ismobile = false;
    }
  }
}
