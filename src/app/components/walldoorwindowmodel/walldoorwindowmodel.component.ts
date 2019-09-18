import { Component, OnInit, Input } from '@angular/core';
import { WindowObject } from 'src/app/models/windowobject';
import { Wall } from 'src/app/models/wall';
import { WallExtend } from 'src/app/models/wallextend';
import { Door } from 'src/app/models/door';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'ngx-webstorage';
import { Register } from 'src/app/models/register';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { Wallwindowdoormodel } from 'src/app/models/wallwindowdoormodel';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';

@Component({
  selector: 'app-walldoorwindowmodel',
  templateUrl: './walldoorwindowmodel.component.html',
  styleUrls: ['./walldoorwindowmodel.component.css']
})
export class WalldoorwindowmodelComponent implements OnInit {


  projectid: string = "";
  designid: string = "";

  wallobject: Wall;
  wallextendobject: WallExtend;
  doorobject: Door;
  windowobject: WindowObject;
  wallwindowdoormodel: Wallwindowdoormodel;
  windowobjectmodellist = [];


  wallwidth = 0;
  wallheight = 0;
  wallarea = 0;
  doorwidth = 0;
  doorheight = 0;
  rvaluedoor = 0;
  windowwidth = 0;
  windowheight = 0; 
  rvavluewindow = 0;
  display: boolean = false;
  display1: boolean = false;
  display2: boolean = false;

  registeruser: Register;

  orientation = ["North", "North North East", "North East", "East North East",
    "South", "South South West", "South West", "West South West",
    "East", "East South East", "South East", "South South East",
    "West", "West North West", "North West", "North North West"];


  constructor(private toastr: ToastrService, public route: ActivatedRoute,
    private loginservice: LoginserviceService, private wallservice: WalldoorwindowService,
    private buildingmodelservice: BuildingmodelService) {
      let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
          this.registeruser = x;
        }
        
      });
    this.route.queryParams.subscribe(params => {
      this.projectid = params['projectid'];
      this.designid = params['designid'];
    });
  }


  fetchingwalldata() {
    this.wallservice.walllistdata(this.designid);
  }

  fetchingwindowdata() {
    this.wallservice.windowlistdata(this.designid)
  }

  fetchingdoordata() {
    this.wallservice.doorlistdata(this.designid);
  }

  fetchingwallwindowdoormodel(){
    this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
  }

  ngOnInit() {
    this.setdefault();
    setTimeout(() => {
      this.fetchingwalldata();
      this.fetchingwindowdata();
      this.fetchingdoordata();
      this.fetchingwallwindowdoormodel();
    }, 1000);
  }

  setdefault() {
    this.wallwindowdoormodel = {
      ID: null,
      Wall: null,
      Window: null,
      Door: null,
      UserID: null,
      DesignID: null,
      ProjectID: null
    };

    this.wallwidth = 0;
    this.wallheight = 0;
    this.wallarea = 0;
    this.wallextendobject = {
      WallSection: null,
      WallName: null,
      Height: null,
      Width: null,
      Area: null,
      ConstructionRValue: null,
      Orientation: null
    };
    this.doorobject = null;
    this.windowobject = {
      WindowName: null,
      ConstructionRValue: 0,
      Width: null,
      Height: null,
      Area: 0,
      ID: null,
      OWA: 0,
      ShadePercent: 0
    };
    this.wallextendobject = {
      WallSection: null,
      WallName: null,
      ConstructionRValue: null,
      Orientation: null,
      Area: 0,
      Height: null,
      Width: null
    };
  }

  addvaluewindow() {
    if (this.windowobject) {
      this.windowobjectmodellist.push(this.windowobject);
      console.log(this.windowobjectmodellist);
      this.windowobject = null;
      this.windowheight = 0;
      this.windowwidth = 0;
      this.rvavluewindow = 0;
    }
  }

  cleardoor() {
    this.doorheight = 0;
    this.doorwidth = 0;
    this.doorobject = null;
  }


  optionchange() {
    console.log(this.wallobject);
  }

  optionchange1() {
    this.windowwidth = this.windowobject.Width;
    this.windowheight = this.windowobject.Height;
    this.rvavluewindow = this.windowobject.ConstructionRValue;
  }

  optionchange2() {
    this.doorwidth = this.doorobject.Width;
    this.doorheight = this.doorobject.Height;
    this.rvaluedoor = this.doorobject.ConstructionRValue;
  }



  onKeyWidthWall(event: any) {
    if (event.target.value === "") {
      this.wallextendobject.Area = 0;
    } else {
      this.wallextendobject.Width = Number(event.target.value);
      this.wallextendobject.Area = Number(this.wallextendobject.Width * this.wallextendobject.Height);
    }
  }

  onKeyHeightWall(event: any) {
    if (event.target.value === "") {
      this.wallextendobject.Area = 0;
    } else {
      this.wallextendobject.Height = Number(event.target.value);
      this.wallextendobject.Area = Number(this.wallextendobject.Width * this.wallextendobject.Height);
    }
  }



  addwalltoggle() { //
    this.display = !this.display;
  }

  addwindowtoggle() {
    this.display1 = !this.display1;

  }

  adddoortoggle() {
    this.display2 = !this.display2;

  }



  deletewindow(index: number) { //Delete window during editing model
    if (confirm("Do you want to delete this section") === true) {
      this.windowobjectmodellist.splice(index, 1);
    }
  }

  onSubmitModel() {
    this.wallextendobject.WallName = this.wallobject.WallName;
    this.wallextendobject.ConstructionRValue = this.wallobject.ConstructionRValue;
    if (this.wallextendobject.WallSection === null || this.wallextendobject.Orientation === null ||
      this.wallextendobject.WallName === null || this.wallextendobject.WallName === undefined || this.wallextendobject.Height === 0 ||
      this.wallextendobject.Width === 0) {
      this.toastr.error("Please complete wall information", "Error Message");
    } else {
      this.wallwindowdoormodel = {
        Wall: this.wallextendobject,
        Window: this.windowobjectmodellist,
        Door: this.doorobject,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };

      console.log(this.wallwindowdoormodel);
      this.buildingmodelservice.wallwindowdoormodelPost(this.wallwindowdoormodel, this.designid).subscribe(res =>{
        this.toastr.success("Insert new model successfully", "Info Message");
        this.setdefault();
        this.cleardoor();
        this.display = false;
        this.display1 = false;
        this.display2 = false;
        this.fetchingwallwindowdoormodel();
        this.windowobjectmodellist = [];
      }, err => {
        this.toastr.error("Insert new model failed", "Info Message");
      });
    }

  }

}
