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

  roomlist = [];
  wallwindowdoormodellist = [];

  totalwallnorth: number = 0;
  totalwallsouth: number = 0;
  totalwalleast: number = 0;
  totalwallwest: number = 0;

  totalwindownorth: number = 0;
  totalwindoweast: number = 0;
  totalwindowwest: number = 0;
  totalwindowsouth: number = 0;

  owawindownorth: number = 0;
  owawindowsouth: number = 0;
  owawindoweast: number = 0;
  owawindowwest: number = 0;


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

    this.buildingmodelservice.fetchwallwindowdoormodel(this.designid).subscribe(res => {
      this.wallwindowdoormodellist = res;

      this.wallwindowdoormodellist.forEach(e => {

        if (e.data.Orientation === "North") {
          this.totalwallnorth += Number(Number(e.data.Wall.Area).toFixed(2));
          let grossowa: number = 0;
          if (e.data.Window.length > 0) {
            
            for (let y of e.data.Window) {
              this.totalwindownorth += Number(Number(y.Area).toFixed(2));
              grossowa += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
            }

          }
          this.owawindownorth = grossowa;
        }
        if (e.data.Orientation === "South") {
          this.totalwallsouth += Number(Number(e.data.Wall.Area).toFixed(2));
          let grossowa: number = 0;
          if (e.data.Window.length > 0) {
            
            for (let y of e.data.Window) {
              this.totalwindowsouth += Number(Number(y.Area).toFixed(2));
              grossowa += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
            }

          }
          this.owawindowsouth = grossowa;
        }
        if (e.data.Orientation === "East") {
          this.totalwalleast += Number(Number(e.data.Wall.Area).toFixed(2));
          let grossowa: number = 0;
          if (e.data.Window.length > 0) {
            
            for (let y of e.data.Window) {
              this.totalwindoweast += Number(Number(y.Area).toFixed(2));
              grossowa += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
            }

          }
          this.owawindoweast = grossowa;
        }
        if (e.data.Orientation === "West") {
          this.totalwallwest += Number(Number(e.data.Wall.Area).toFixed(2));
          let grossowa: number = 0;
          if (e.data.Window.length > 0) {
            
            for (let y of e.data.Window) {
              this.totalwindowwest += Number(Number(y.Area).toFixed(2));
              grossowa += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
            }

          }
          this.owawindowwest = grossowa;
        }
      });


      // for (let i of this.wallwindowdoormodellist) {

      //   if (i.data.Wall.Orientation === "North") {
      //     this.totalwallnorth += Number(Number(i.data.Wall.Area).toFixed(2));
      //     let grossowa: number = 0;
      //     if (i.data.Window.length > 0) {
            
      //       for (let y of i.data.Window) {
      //         this.totalwindownorth += Number(Number(y.Area).toFixed(2));
      //         grossowa += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
      //       }

      //     }
      //     this.owawindownorth = grossowa;
      //   }

      // }

      // for (let i of this.wallwindowdoormodellist) {
      //   if (i.data.Wall.Orientation === "South") {
      //     this.totalwallsouth += Number(Number(i.data.Wall.Area).toFixed(2));
      //     if (i.data.Window.length > 0) {
      //       let grossowa: number = 0;
      //       for (let y of i.data.Window) {
      //         this.totalwindowsouth += Number(Number(y.Area).toFixed(2));
      //         grossowa += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
      //       }
      //       this.owawindowsouth = grossowa;
      //     }
      //   }
      // }

      // for (let i of this.wallwindowdoormodellist) {
      //   if (i.data.Wall.Orientation === "East") {
      //     this.totalwalleast += Number(Number(i.data.Wall.Area).toFixed(2));
      //     if (i.data.Window.length > 0) {
      //       let grossowa: number = 0;
      //       for (let y of i.data.Window) {
      //         this.totalwindoweast += Number(Number(y.Area).toFixed(2));
      //         grossowa += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
      //       }
      //       this.owawindoweast = grossowa;
      //     }
      //   }
      // }

      // for (let i of this.wallwindowdoormodellist) {
      //   if (i.data.Wall.Orientation === "West") {
      //     this.totalwallwest += Number(Number(i.data.Wall.Area).toFixed(2));
      //     if (i.data.Window.length > 0) {
      //       let grossowa: number = 0;
      //       for (let y of i.data.Window) {
      //         this.totalwindowwest += Number(Number(y.Area).toFixed(2));
      //         grossowa += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
      //       }
      //       this.owawindowwest = grossowa;
      //     }
      //   }
      // }

    });

    this.roomserv.fetchroombyid(this.designid).subscribe(res => {
      this.roomlist = res;
      console.log(this.roomlist);
    });
  }

  returntoSchedule() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  getcalculateheatloss() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1heatingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  getcalculatenaturallighting() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1naturallightingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }
  
  getcalculatepassive() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1passiveventilation"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

}
