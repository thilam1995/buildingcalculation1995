import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profilesetting',
  templateUrl: './profilesetting.component.html',
  styleUrls: ['./profilesetting.component.css']
})
export class ProfilesettingComponent implements OnInit {

  registeruser: Register;
  fullname = {
    fname:"",
    lname: ""
  }

  isedit: boolean = false;
  iscomplete: boolean = false;
  constructor(private loginservice: LoginserviceService, private toastr: ToastrService) {
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
    this.resetform();
  }

  resetform(){
    this.fullname = {
      fname:"",
      lname: ""
    }
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.fullname.fname = form.value.fName;
    this.fullname.lname = form.value.lName;
    console.log(this.fullname);
    if(this.fullname.fname && this.fullname.lname){
      this.loginservice.updatename(this.fullname.fname, this.fullname.lname, this.registeruser.ID).subscribe(x => {
        this.toastr.success("Change your name successfully!", "Profile Message");
        this.isedit = false;

      }, err => {
        this.toastr.error("Error: "+ err, "Profile Message");
      });
    }else{
      this.toastr.error("Please enter your name.", "Profile Message");
    }

  }
  
  onEdit(){
    this.isedit = !this.isedit;
    if(this.isedit){
      this.fullname = {
        fname: this.registeruser.FirstName,
        lname: this.registeruser.LastName
      }
    }else{
      this.resetform();
    }
  }

}
