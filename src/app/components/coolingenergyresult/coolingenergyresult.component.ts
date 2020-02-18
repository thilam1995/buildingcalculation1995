import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { DesignService } from 'src/app/service/design.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';
import { RoomserviceService } from 'src/app/service/roomservice.service';
import { Register } from 'src/app/models/register';
import { Design } from 'src/app/models/design';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-coolingenergyresult',
  templateUrl: './coolingenergyresult.component.html',
  styleUrls: ['./coolingenergyresult.component.css']
})
export class CoolingenergyresultComponent implements OnInit {

  projectid: string = "";
  designid: string = "";
  registeruser: Register;
  designobject: Design;
  projectobject: Project;
  constructor(public route: ActivatedRoute,
    private router: Router, private loginservice: LoginserviceService,
    private buildingmodelservice: BuildingmodelService, private designservice: DesignService,
    private toastr: ToastrService, private projectservice: ProjectService,
    private roomserv: RoomserviceService) {
      let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if (x === null) {
          this.registeruser = loginapp;
        } else {
          this.registeruser = x;
        }
  
      });
      this.route.queryParams.subscribe(params => {
        this.projectid = params['projectid'];
        this.designid = params['designid'];
      });
     }

  ngOnInit() {
    this.setdefault();
    this.fetchingmodel();
  }

  setdefault() {
    this.designobject = {
      DesignID: "",
      DesignName: "",
      TargetRating: null,
      CompletedBy: "",
      DrawingSet: "",
      Typology: "",
      DateCreated: null,
      ProjectID: "",
      UserID: "",
      Climatetype: "",
      City: "",
      StreetName: "",
      DateUpdate: "",
      Postcode: "",
      FloorArea: null
    };
    this.projectobject = {
      ProjectID: "",
      ProjectName: "",
      DateCreated: "",
      DateModified: "",
      UserID: ""
    };
  }

  fetchingmodel() {
    this.projectservice.getprojectid(this.projectid).subscribe(x => {
      this.projectobject = {
        ProjectID: x.id,
        ProjectName: x.data.ProjectName,
        DateCreated: x.data.DateCreated,
        DateModified: x.data.DateModified,
        UserID: x.data.UserID
      }
    }, err => {
      this.toastr.error("Something wrong!", "Error Message");
    });
    this.designservice.getdesignbyID(this.designid).subscribe(res => {
      //console.log(res);
      this.designobject = {
        DesignID: res.id,
        DesignName: res.data.DesignName,
        TargetRating: res.data.TargetRating,
        CompletedBy: res.data.CompletedBy,
        DrawingSet: res.data.DrawingSet,
        Typology: res.data.Typology,
        DateCreated: res.data.DateCreated,
        ProjectID: res.data.ProjectID,
        UserID: res.data.UserID,
        Climatetype: res.data.Climatetype,
        City: res.data.City,
        StreetName: res.data.StreetName,
        DateUpdate: res.data.DateUpdate,
        Postcode: res.data.Postcode,
        FloorArea: res.data.FloorArea
      };
      //console.log(this.targetingschedule);
    }, err => {
      this.toastr.error("Something wrong!", "Error Message");
    });
  }

  returntoSchedule() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

}
