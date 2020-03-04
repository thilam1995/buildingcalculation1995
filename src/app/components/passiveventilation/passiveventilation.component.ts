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
  selector: 'app-passiveventilation',
  templateUrl: './passiveventilation.component.html',
  styleUrls: ['./passiveventilation.component.css']
})
export class PassiveventilationComponent implements OnInit {

  projectid: string = "";
  designid: string = "";
  registeruser: Register;
  designobject: Design;
  projectobject: Project;

  wallwindowdoormodellist = [];
  windowdistinct = [];

  iscompliance: boolean = false;
  compliancepoint: number = 0;
  windowlist: Array<any> = [];

  totalnetowa: number = 0;
  totalnetowapercent: number = 0;

  iscomplied: boolean = false;

  currentroute: string = "";

  constructor(public route: ActivatedRoute,
    private router: Router, private loginservice: LoginserviceService,
    private buildingmodelservice: BuildingmodelService, private designservice: DesignService,
    private toastr: ToastrService, private projectservice: ProjectService) {
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
    this.currentroute = this.route.snapshot.url[0].path;
    console.log(this.route.snapshot.url[0].path);
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
      let allwindowlist = [];

      for (let i of this.wallwindowdoormodellist) {

        //console.log(i.data.Window);
        if (i.data.Window.length > 0) {
          for (let a of i.data.Window) {
            allwindowlist.push(a);
          }
        }

      }
      this.windowdistinct = Array.from(new Set(allwindowlist.map(x =>
        x.WindowName
      )));
      this.windowdistinct.sort();

      for (let i of this.windowdistinct) {
        let object = { windowname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0, owa: 0 };
        for (let x of this.wallwindowdoormodellist) {
          for (let e of x.data.Window) {
            if (e.WindowName === i) {
              object.numinclusion++;
              object.totalarea += e.Area;
              object.totalrvalue = Number(e.ConstructionRValue);

              object.owa = Number(e.OWA);
            }
          }
          object.totalheatloss = object.totalarea / object.totalrvalue;
        }

        this.windowlist.push(object);
        object = { windowname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0, owa: 0 };
      }


    });

    setTimeout(() => {
      this.finalcalculation();
    }, 1200);
  }

  finalcalculation(){
    this.windowlist.forEach(e => {
      this.totalnetowa += e.numinclusion * (e.totalarea * e.owa);
      this.totalnetowapercent += ((e.numinclusion * (e.totalarea * e.owa)) / this.designobject.FloorArea) * 100;
    });

    this.iscomplied = this.totalnetowapercent > (0.05 * 100);
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

  getcalculatecoolingenergy() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1coolingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }
  
  getcalculatepassive() {
    if(this.currentroute === "ehc1passiveventilation"){
      alert("You are now in EHC-7 Passive Ventilation!");
    }
    // this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1passiveventilation"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }
}
