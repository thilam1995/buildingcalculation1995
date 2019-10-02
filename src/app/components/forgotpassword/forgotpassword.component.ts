import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { NgForm } from '@angular/forms';
import { Register } from 'src/app/models/register';
import { ToastrService } from 'ngx-toastr';
import { PasswordcryptService } from 'src/app/service/passwordcrypt.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  Email: string = "";
  Newpass: string = "";
  Renewpass: string = "";
  register: Register;
  registerobject: any;
  isaccountfound: boolean = false;
  constructor(private loginservice: LoginserviceService, private toastr: ToastrService,
    private passwordencrypt: PasswordcryptService) { }

  ngOnInit() {
    this.register = {
      ID: null,
      Email: null,
      FirstName: null,
      LastName: null,
      Password: null
    };
  }

  onSubmitEmail(form: NgForm) {
    if (form.value.email) {
      this.loginservice.requestresetpassword(form.value.email).subscribe(res => {
        if (Object.keys(res).length === 0) {
          this.toastr.error("The Account is not available!", "Error Message");
        } else {
          this.registerobject = res;
          this.register = {
            ID: this.registerobject.id,
            FirstName: this.registerobject.data.FirstName,
            Email: this.registerobject.Email,
            LastName: this.registerobject.LastName,
            Password: this.registerobject.Password
          };
          this.isaccountfound = true;
          
        }
      }, err => {
        this.toastr.error("Something wrong", "Error Message");
      });
    } else {
      this.toastr.error("Please enter your password", "Error Message");
    }
  }

  isEmpty(obj: Object): boolean {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  onSubmitPassword(form: NgForm) {
    console.log(form.value);
    if (form.value.newpass !== form.value.renewpass) {
      this.toastr.error("The password is not the same as the retyped", "Error Message");
    } else {

      this.loginservice.updatepassword(this.passwordencrypt.set('123456$#@$^@1ERF', this.Renewpass), this.register.ID).subscribe(res => {
        this.toastr.success("Password updated", "Update Message");
        this.Newpass = "";
        this.Renewpass = "";
        this.Email = "";
      }, err => {
        this.toastr.error("Something wrong", "Error Message");
      });
    }
  }

}
