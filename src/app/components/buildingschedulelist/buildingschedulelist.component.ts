import { Component, OnInit } from '@angular/core';
import { BuildinginfoserviceService } from 'src/app/service/buildinginfoservice.service';
import { ProjectService } from 'src/app/service/project.service';
import { Register } from 'src/app/models/register';
import { LoginComponent } from '../login/login.component';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-buildingschedulelist',
  templateUrl: './buildingschedulelist.component.html',
  styleUrls: ['./buildingschedulelist.component.css']
})
export class BuildingschedulelistComponent implements OnInit {

  //buildingschedulelist = [];
  registeruser: Register;
  constructor(private projectservice: ProjectService, private loginservice: LoginserviceService) { 
    this.loginservice.currentUser.subscribe(x => this.registeruser = x);
  }

  ngOnInit() {
    //this.buildingschedulelist = this.buildingservice.buildinginfolistdata();
    this.projectservice.projectfetching(this.registeruser.ID);
  }

}
