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
  isclicked: boolean = false;

  constructor(private router: Router,
    private route: ActivatedRoute, private loginservice: LoginserviceService,
    private passworddecrypt: PasswordcryptService, private toastr: ToastrService) {
    if (this.loginservice.currentUserValue) {
      this.router.navigate(["/main/" + `${this.loginservice.currentUserValue.ID}` + "/home"]);
    }
  }

  ngOnInit() {
    this.resetloginform();
    this.route.queryParams.subscribe(params => {
      if (this.login.Email === null && this.login.Password === null) {
        this.return = this.route.snapshot.queryParams['returnUrl'] || '/';
      }
    });
    // this.setdefault();
  }

  onSubmit(form: NgForm) {
    if (form.value.email && form.value.password) {
      this.isclicked = true;
      this.login = {
        Email: form.value.email.toLowerCase(),
        Password: form.value.password
      };
      this.loginservice.login(this.login).subscribe(res => {
        //console.log(res);
        if (Object.keys(res).length === 0) {
          this.toastr.error("The Account is not available!", "Error Message");
          this.isclicked = false;
        } else {
          if (form.value.password === this.passworddecrypt.get('123456$#@$^@1ERF', res.Password)) {
            setTimeout(() => {
              this.loginservice.registermember = {
                ID: res.ID,
                FirstName: res.FirstName,
                LastName: res.LastName,
                Email: res.Email,
                Password: res.Password
              };

              // localStorage.setItem('currentUser', JSON.stringify(this.loginservice.registermember));
              // localStorage.setItem('login', JSON.stringify(true));
              if (this.loginservice.currentUserValue.ID === null || this.loginservice.currentUserValue.ID === undefined) {
                this.router.navigate(["/main/" + `${this.loginservice.registermember.ID}` + "/home"]);
              } else {
                this.router.navigate(["/main/" + `${this.loginservice.currentUserValue.ID}` + "/home"]);
              }


            }, 2000);
          } else {
            this.toastr.error("Incorrect Password", "Login Message");
            this.isclicked = false;
          }
        }
      }, err => {
        console.log(err);
        this.toastr.error(err, "Error Message")
        this.isclicked = false;
      });
    }
  }

  resetloginform() {
    this.login = {
      Email: "",
      Password: ""
    }
  }

  setdefault() {
    this.loginservice.registermember = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }

}
