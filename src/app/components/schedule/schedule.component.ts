import { Component, OnInit, Input } from '@angular/core';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { RoofskylightService } from 'src/app/service/roofskylight.service';
import { FloorService } from 'src/app/service/floor.service';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  registeruser: Register;
  designid: string = "";
  projectid: string = "";
  constructor(private wallservice: WalldoorwindowService, private roofskylightservice: RoofskylightService,
    private floorservice: FloorService, private loginservice: LoginserviceService, public route: ActivatedRoute) { 
      this.route.queryParams.subscribe(params => {
        this.projectid = params['projectid'];
        this.designid = params['designid'];
      });
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
    this.wallservice.walllistdata(this.designid);
    this.wallservice.windowlistdata(this.designid);
    this.wallservice.doorlistdata(this.designid);
    this.roofskylightservice.rooflistdata(this.designid);
    this.roofskylightservice.skylightlistdata(this.designid);
    this.floorservice.floorlistdata(this.designid);

  }

}
