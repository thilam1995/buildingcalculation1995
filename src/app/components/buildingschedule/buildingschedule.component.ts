import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { LocationService } from 'src/app/service/location.service';
import { ClimateService } from 'src/app/service/climate.service';
import { BuildinginfoserviceService } from 'src/app/service/buildinginfoservice.service';
import { Buildinginfo } from 'src/app/models/buildinginfo';
import { Door } from 'src/app/models/door';
import { WindowObject } from 'src/app/models/windowobject';
import { Wall } from 'src/app/models/wall';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';
import { Floors } from 'src/app/models/floors';
import { NullAstVisitor } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService, SessionStorageService, LocalStorage } from 'ngx-webstorage';
import { Register } from 'src/app/models/register';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { DesignService } from 'src/app/service/design.service';
import { Design } from 'src/app/models/design';
import { RoofskylightService } from 'src/app/service/roofskylight.service';
import { FloorService } from 'src/app/service/floor.service';

@Component({
  selector: 'app-buildingschedule',
  templateUrl: './buildingschedule.component.html',
  styleUrls: ['./buildingschedule.component.css']
})
export class BuildingscheduleComponent implements OnInit {

  projectid: string = "";
  designid: string = "";
  //state$: Observable<object>;
  //xstateobject: any;
  designobject: Design;
  designobject1: Design;
  isedit: boolean = false;



  registeruser: Register;
  doorobject: Door;
  windowobject: WindowObject;
  wallobject: Wall;
  skylightsobject: Skylights;
  roofobject: Roof;
  floorobject: Floors;

  // buildingscheduleproposed = {};
  // roofskylightobject = {};
  // floorsobject = {};

  // doorobjectlist = [];
  // windowobjectlist = [];
  // wallobjectlist = [];
  // skylightsobjectlist = [];
  // roofobjectlist = [];
  // floorobjectlist = [];

  wallwindowdoorobjectlist = [];
  floormodelobjectlist = [];
  roofskylightobjectlist = [];


  constructor(private locationService: LocationService,
    private climateservice: ClimateService,
    public route: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private localSt: LocalStorageService,
    private loginservice: LoginserviceService, private designservice: DesignService) {
    //this.setdefault();
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
    this.setnulldefault();
    this.route.queryParams.subscribe(params => {
      this.projectid = params['projectid'];
      this.designid = params['designid'];
    });
    // this.climateservice.getallclimate();
    this.locationService.getallLocation();
    this.climateservice.getallhomestarlist();
    this.climateservice.getclimatelist();
    this.designservice.getdesignbyID(this.designid).subscribe(res => {
      //console.log(res);
      this.designobject = {
        DesignID: res.id,
        DesignName: res.data.DesignName,
        TargetRating: res.data.TargetRating,
        CompletedBy: res.data.CompletedBy,
        DrawingSet: res.data.DrawingSet,
        Typology: res.data.Typology,
        NumofHabitationroom: res.data.NumofHabitationroom,
        FloorArea: res.data.FloorArea,
        ProjectID: res.data.ProjectID,
        UserID: res.data.UserID,
        DateCreated: res.data.DateCreated,
        Climatetype: res.data.Climatetype,
        City: res.data.City,
        StateName: res.data.StateName,
        StreetName: res.data.StreetName
      };
      console.log(this.designobject);
    }, err => {
      this.toastr.error("Something wrong!", "Error Message");
    });
    
    //this.fetchingdata(this.designid);
  }

  // fetchingdata(designid: string){
  //   this.wallservice.walllistdata(designid).subscribe(res => {
  //     this.wallobjectlist = res;
  //   }, err => {
  //     this.toastr.error("Something Wrong!", "Error Message");
  //   });
  //   this.wallservice.windowlistdata(this.designid).subscribe(res => {
  //     this.windowobjectlist = res;
  //   }, err => {
  //     this.toastr.error("Something wrong", "Error Message!");
  //   });
  //   this.wallservice.doorlistdata(this.designid).subscribe(res => {
  //     this.doorobjectlist = res;
  //   }, err => {
  //     this.toastr.error("Something wrong", "Error Message!");
  //   });
  //   this.roofskylightservice.rooflistdata(this.designid).subscribe(res => {
  //     this.roofobjectlist = res;
  //   }, err => {
  //     this.toastr.error("Something Wrong", "Error Message!");
  //   });
  //   this.roofskylightservice.skylightlistdata(this.designid).subscribe(res => {
  //     this.skylightsobjectlist = res;
  //   }, err => {
  //     this.toastr.error("Something Wrong", "Error Message!");
  //   });
  //   this.floorservice.floorlistdata(this.designid).subscribe(res => {
  //     this.floorobjectlist = res;
  //   }, err => {
  //     this.toastr.error("Error! Something Wrong.", "Error Message")
  //   });
  // }

  setnulldefault() {
    this.designobject = {
      DesignID: "",
      DesignName: "",
      TargetRating: null,
      CompletedBy: "",
      DrawingSet: "",
      Typology: "",
      NumofHabitationroom: null,
      FloorArea: null,
      ProjectID: "",
      UserID: "",
      DateCreated: "",
      Climatetype: "",
      City: "",
      StateName: "",
      StreetName: ""
    };

    this.designobject1 = {
      DesignID: "",
      DesignName: "",
      TargetRating: null,
      CompletedBy: "",
      DrawingSet: "",
      Typology: "",
      NumofHabitationroom: null,
      FloorArea: null,
      ProjectID: "",
      UserID: "",
      DateCreated: "",
      Climatetype: "",
      City: "",
      StateName: "",
      StreetName: ""
    };
    
    this.doorobject = {
      DesignID: null,
      ID: null,
      ProjectID: null,
      UserID: null, 
      DoorName: null,
      Area: null,
      ConstructionRValue: null,
      Height: null,
      Width: null
    };

    this.wallobject = {
      WallName: null,
      ConstructionRValue: null,
      Description: null,
      DesignID: null,
      ID: null,
      ProjectID: null,
      UserID: null
    };

    this.windowobject = {
      WindowName: null,
      ConstructionRValue: null,
      Width: null,
      Height: null,
      Area: null,
      ID: null,
      OWA: null,
      ShadePercent: 0,
      DesignID: null,
      ProjectID: null,
      UserID: null
    };

    this.skylightsobject = {
      Area: null,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      DesignID: null,
      ID: null,
      ProjectID: null,
      UserID: null
    };

    this.roofobject = {
      Description: null,
      ConstructionRValue: null,
      RoofName: null,
      DesignID: null,
      ID: null,
      ProjectID: null,
      UserID: null
    };

    this.floorobject = {
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
      DesignID: null,
      ID: null,
      ProjectID: null,
      UserID: null
    }
  }

  changeoption1(){
    console.log(this.designobject1.TargetRating);
  }

  changeoption2(){
    console.log(this.designobject1);
  }


  getcalculate() {
    this.router.navigate(["/main/"+`${this.registeruser.ID}`+"/ehc1heatingenergy"],{ queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  toggleedit(designobject?: Design){
    this.isedit = !this.isedit;
    if(this.isedit){
      this.designobject1 = Object.assign({}, designobject);
    }else{
      this.designobject1 = {
        DesignID: "",
        DesignName: "",
        TargetRating: null,
        CompletedBy: "",
        DrawingSet: "",
        Typology: "",
        NumofHabitationroom: null,
        FloorArea: null,
        ProjectID: "",
        UserID: "",
        DateCreated: "",
        Climatetype: "",
        City: "",
        StateName: "",
        StreetName: ""
      };
    }
  }

  updatedesign(){
    if(this.designobject1.DesignID === null){
      this.toastr.error("No Design ID Available", "Error Message")
    }else{
      this.designservice.designUpdating(this.designobject1, this.designobject1.DesignID).subscribe(res =>{
        this.toastr.success("Update Design Successfully", "Success Message");
        this.isedit = false;
        this.designservice.getdesignbyID(this.designid).subscribe(res => {
          
          this.ngOnInit();
        }, err => {
          this.toastr.error("Something wrong!", "Error Message");
        });
      }, err => {
        this.toastr.error("Something Wrong!", "Error Message")
      });
    }
    
  }

  compareFn(a, b) {
    //console.log(a, b, a && b && a.id == b.id);
    return a && b && a.id == b.id;
  }

  setdefault(){
    this.loginservice.registermember = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }
}
