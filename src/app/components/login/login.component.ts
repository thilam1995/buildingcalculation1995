import { Component, OnInit, Input } from '@angular/core';
import { Login } from 'src/app/models/login';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login;
  return: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute, private loginservice: LoginserviceService) { }

  ngOnInit() {
    this.resetloginform();
    this.route.queryParams.subscribe(params => {
      if(this.login.Email !== null && this.login.Password !== null){
        this.return = params['return'] || 'home';
      }
    });
  }

  onSubmit(form: NgForm){
    if(form.value.Email && form.value.Password){
      this.loginservice.login(form.value);
    }
  }

  resetloginform(){
    this.login = {
      Email: "",
      Password: ""
    }
  }
}
