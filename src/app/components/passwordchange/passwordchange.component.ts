import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { PasswordcryptService } from 'src/app/service/passwordcrypt.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  registeruser: Register;
  iscompletechange: boolean = false;
  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";
  constructor(private loginservice: LoginserviceService, private passwordencrypt: PasswordcryptService,
    private toastr: ToastrService) {
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
    this.setdefault();
  }

  onSubmit(form: NgForm){
    this.oldPassword = form.value.oldpass;
    this.newPassword = form.value.newpassword;
    this.confirmPassword = form.value.confirmpass;
    if(this.oldPassword === this.passwordencrypt.get('123456$#@$^@1ERF', this.registeruser.Password)){
      if(this.newPassword === this.confirmPassword){
        this.loginservice.updatepassword(this.passwordencrypt.set('123456$#@$^@1ERF', this.confirmPassword), this.registeruser.ID).subscribe(x =>{
          this.toastr.success("Password Changed!", "Error Message");
          this.iscompletechange = true;
        });
      }else{
        this.toastr.error("New password is not the same as the comfirmed Password", "Error Message");
      }
    }else{
      this.toastr.error("This is not your correct current password", "Error Message");
    }
  }

  setdefault(){
    this.oldPassword = "";
    this.newPassword = "";
    this.confirmPassword = "";
  }
}
