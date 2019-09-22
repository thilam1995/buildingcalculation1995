import { Component, OnInit } from '@angular/core';
import { BuildinginfoserviceService } from 'src/app/service/buildinginfoservice.service';
import { ProjectService } from 'src/app/service/project.service';
import { Register } from 'src/app/models/register';
import { LoginComponent } from '../login/login.component';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-buildingschedulelist',
  templateUrl: './buildingschedulelist.component.html',
  styleUrls: ['./buildingschedulelist.component.css']
})
export class BuildingschedulelistComponent implements OnInit {

  buildingschedulelistfilter = [];
  searchproject: string = "";
  registeruser: Register;
  registerID: string = "";
  constructor(private projectservice: ProjectService, private loginservice: LoginserviceService,
    public route: ActivatedRoute) {

    //this.loginservice.currentUser.subscribe(x => this.registeruser = x);
  }

  ngOnInit() {
    //this.buildingschedulelist = this.buildingservice.buildinginfolistdata();
    this.setdefault();

    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    setTimeout(() => {
      this.loginservice.currentUser.subscribe(x => {
        if (x === null) {
          this.registeruser = loginapp;
        } else {
          this.registeruser = x;
        }

      });

      this.registerID = this.registeruser.ID;

      console.log(this.registerID);
      //this.registerID = this.registeruser.ID;


      this.projectservice.projectfetching(this.registerID);
    }, 1900);
  }


  setdefault() {
    this.projectservice.projectList = [];
    this.registeruser = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
    this.registerID = "";
  }
}
