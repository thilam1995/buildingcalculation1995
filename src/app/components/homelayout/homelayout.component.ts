import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.css']
})
export class HomelayoutComponent implements OnInit {

  registeruser: Register;
  constructor(private loginservice: LoginserviceService, public route: ActivatedRoute) { 
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
          this.registeruser = x;
        }
        
      });
  }

  ngOnInit() {
  }

}
