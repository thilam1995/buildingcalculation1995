import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { DesignService } from 'src/app/service/design.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';
import { Register } from 'src/app/models/register';
import { RoomserviceService } from 'src/app/service/roomservice.service';
import { Design } from 'src/app/models/design';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-naturallighting',
  templateUrl: './naturallighting.component.html',
  styleUrls: ['./naturallighting.component.css']
})
export class NaturallightingComponent implements OnInit {

  projectid: string = "";
  designid: string = "";
  registeruser: Register;
  designobject: Design;
  projectobject: Project;
  
  iscompliance: boolean = false;
  compliancepoint: number = 0;

  ispasslist = [];
  roomlist = [];

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
      NumofHabitationroom: null,
      FloorArea: null,
      DateCreated: null,
      ProjectID: "",
      UserID: "",
      Climatetype: "",
      City: "",
      StreetName: "",
      DateUpdate: "",
      Postcode: ""
    };
    this.projectobject = {
      ProjectID: "",
      ProjectName: "",
      DateCreated: "",
      DateModified: "",
      UserID: ""
    };
  }

  returntoSchedule() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
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
        Typology: res.data.Typology, DateCreated: res.data.DateCreated,
        NumofHabitationroom: Number(res.data.NumofHabitationroom),
        FloorArea: res.data.FloorArea,
        ProjectID: res.data.ProjectID,
        UserID: res.data.UserID,
        Climatetype: res.data.Climatetype,
        City: res.data.City,
        StreetName: res.data.StreetName,
        DateUpdate: res.data.DateUpdate,
        Postcode: res.data.Postcode
      };
      //console.log(this.targetingschedule);
    }, err => {
      this.toastr.error("Something wrong!", "Error Message");
    });
    this.roomserv.getallroombydesignid(this.designid);
    this.roomserv.fetchroombyid(this.designid).subscribe(res => {
      this.roomlist = res;
      this.roomlist.forEach(e => {
        if (e.data.RoomID !== "Bathroom") {
          let object = { rooname: "", totalwindowarea: 0, roomfloorarea: 0, shadinglevel: "", naturalrequire: 0, naturalachieved: 0, iscompliance: false };
          let ispass: boolean = false;
          let totalwindowarea: number = 0;
          let naturallightrequire: number = 0;
          let naturallightachieve: number = 0;
          let numberofshaded: number = 0;
          let numberofunshaded: number = 0;
          let shadelevel: string = "";
          e.data.WindowList.forEach(el => {
            totalwindowarea += el.WindowID.Area;
            if (el.IsShading) {
              ++numberofshaded;
            } else {
              ++numberofunshaded;
            }
          });
          // for(let el of e.data.WindowList){
          //   totalwindowarea += el.WindowID.Area;
          //   if (el.IsShading) {
          //     ++numberofshaded;
          //   } else {
          //     ++numberofunshaded;
          //   }
          // }

          naturallightachieve = totalwindowarea / e.data.RoomArea;
          shadelevel = (numberofshaded === e.data.WindowList.length && numberofshaded !== 0)
            || (numberofshaded !== 0 && (numberofshaded >= numberofunshaded || numberofshaded <= numberofunshaded))
            ? "Shade" : "Unshaded";
          naturallightrequire = shadelevel === "Shade" ? 0.20 : 0.15;
          ispass = naturallightachieve >= naturallightrequire;
          object = { rooname: e.data.RoomID, totalwindowarea: totalwindowarea, roomfloorarea: e.data.RoomArea, shadinglevel: shadelevel, naturalrequire: naturallightrequire, naturalachieved: naturallightachieve, iscompliance: ispass }
          this.ispasslist.push(object.iscompliance);
          object = { rooname: e.data.RoomID, totalwindowarea: 0, roomfloorarea: 0, shadinglevel: "", naturalrequire: 0, naturalachieved: 0, iscompliance: false };
          ispass = false;
          totalwindowarea = 0;
          naturallightrequire = 0;
          naturallightachieve = 0;
          numberofshaded = 0;
          numberofunshaded = 0;
          shadelevel = "";
        }

      });
      // console.log(this.roomlist);
      // console.log(this.ispasslist);
      this.iscompliance = this.ispasslist.every(Boolean);
      if(this.roomlist.length !== 0){
        if(this.iscompliance){
          this.compliancepoint = 3;
        }else{
          this.compliancepoint = 0;
        }
      }else{
        this.compliancepoint = 0;
      }

    });

  }

}
