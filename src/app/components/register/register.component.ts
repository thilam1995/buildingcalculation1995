import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { PasswordcryptService } from 'src/app/service/passwordcrypt.service';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isregister: boolean = false;
  registerobject: Register;
  Repassword: string = "";
  constructor(private toastr: ToastrService, private loginservice: LoginserviceService,
    private passwordencrypt: PasswordcryptService, private router: Router) { }

  ngOnInit() {
    this.setdefault();
  }

  setdefault() {
    this.registerobject = {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
    };
    this.Repassword = "";
  }

  onSubmit(form: NgForm) {
    if (form.value.firstname && form.value.lastname &&
      form.value.email && form.value.password && form.value.repassword) {
      if (form.value.password !== form.value.repassword) {
        this.toastr.error("Error, the retype password is not the same as the current password", "Register Info");
      } else {
        let registermember: Register = {
          FirstName: form.value.firstname,
          LastName: form.value.lastname,
          Email: form.value.email.toLowerCase(),
          Password: this.passwordencrypt.set('123456$#@$^@1ERF',form.value.password)
        }
        this.loginservice.register(registermember).subscribe(x=>{
          this.toastr.success("Register Sucessfully!", "Register Info");
          this.setdefault();
          //this.router.navigateByUrl('/login');
          this.isregister = true;
        }, error=>{
          this.toastr.error("Something wrong with register function!", "Register Info");
          this.isregister = false;
        });
        
      }
    }
  }

}
