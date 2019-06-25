import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //isopen: boolean = false;
  registeruser: Register;
  
  constructor(private loginservice: LoginserviceService) { }

  ngOnInit() {
    this.loginservice.currentUser.subscribe(x => this.registeruser = x);
  }

}
