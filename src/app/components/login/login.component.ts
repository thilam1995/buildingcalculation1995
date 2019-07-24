import { Component, OnInit, Input } from '@angular/core';
import { Login } from 'src/app/models/login';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { PasswordcryptService } from 'src/app/service/passwordcrypt.service';
import { ToastrService } from 'ngx-toastr';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login;
  return: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute, private loginservice: LoginserviceService,
    private passworddecrypt: PasswordcryptService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetloginform();
    this.route.queryParams.subscribe(params => {
      if(this.login.Email === null && this.login.Password === null){
        this.return = this.route.snapshot.queryParams['returnUrl'] || '/';
      }
    });
    this.setdefault();
  }

  onSubmit(form: NgForm){
    if(form.value.Email && form.value.Password){
      this.loginservice.login(form.value).subscribe(res =>{
        //console.log(res);
        if(form.value.Password === this.passworddecrypt.get('123456$#@$^@1ERF', res.data.Password)){
          setTimeout(() => {
            if (this.loginservice.registermember.ID === null || this.loginservice.registermember.ID === undefined ||
              this.loginservice.registermember.ID === ""){
              this.loginservice.registermember = {
                ID: res.id,
                FirstName: res.data.FirstName,
                LastName: res.data.LastName,
                Email: res.data.Email,
                Password: res.data.Password
              };  
            }
            //console.log(this.loginservice.registermember);
            localStorage.setItem('currentUser', JSON.stringify(this.loginservice.registermember));
            localStorage.setItem('login', JSON.stringify(true));
            this.router.navigateByUrl("/main/"+`${this.loginservice.registermember.ID}`);
          }, 4000);
        }else{
          this.toastr.error("Incorrect Password", "Login Message");
        }
      }, err =>{
        console.log(err);
      });
    }
  }

  resetloginform(){
    this.login = {
      Email: "",
      Password: ""
    }
  }

  setdefault(){
    this.loginservice.registermember = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }

}
