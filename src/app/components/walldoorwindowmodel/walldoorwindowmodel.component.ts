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

  orientationselect: string = "";

  wallobject: Wall;
  wallextendobject: WallExtend;
  doorobject: Door;
  windowobject: WindowObject;
  wallwindowdoormodel: Wallwindowdoormodel;
  windowobjectmodellist = [];
  doorobjectmodellist = [];

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

  orientation = ["North", "South", "East", "West"];


  constructor(private toastr: ToastrService, public route: ActivatedRoute,
    private loginservice: LoginserviceService, private wallservice: WalldoorwindowService,
    private buildingmodelservice: BuildingmodelService) {
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


  fetchingwalldata() {
    this.wallservice.walllistdata(this.designid);
  }

  fetchingwindowdata() {
    this.wallservice.windowlistdata(this.designid)
  }

  fetchingdoordata() {
    this.wallservice.doorlistdata(this.designid);
  }

  fetchingwallwindowdoormodel() {
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
      ProjectID: null,
      Orientation: null
    };

    this.wallwidth = 0;
    this.wallheight = 0;
    this.wallarea = 0;
    this.doorobject = null;
    this.windowobject = null;
    this.wallextendobject = {
      WallSection: null,
      WallName: null,
      ConstructionRValue: null,
      Area: 0,
      Height: null,
      Width: null
    };
    this.wallobject = null;
  }

  addvaluewindow() {
    if (this.windowobject) {
      this.windowobjectmodellist.push(this.windowobject);
      this.windowobject = null;
      this.windowheight = 0;
      this.windowwidth = 0;
      this.rvavluewindow = 0;
    } else if (this.windowobject === null) {
      this.toastr.error("Error! Window cannot be empty!");
    }
  }

  deletewindow(index: number) { //Delete window during editing model
    if (confirm("Do you want to delete this section?") === true) {
      this.windowobjectmodellist.splice(index, 1);
    }
  }

  addvaluedoor() {
    if (this.doorobject) {
      this.doorobjectmodellist.push(this.doorobject);
      this.doorobject = null;
      this.doorheight = 0;
      this.doorwidth = 0;
      this.rvaluedoor = 0;
    } else if (this.doorobject === null) {
      this.toastr.error("Error! Window cannot be empty!");
    }
  }

  deletedoor(index: number) {
    if (confirm("Do you want to delete this section?") === true) {
      this.doorobjectmodellist.splice(index, 1);
    }
  }

  cleardoor() {
    this.doorheight = 0;
    this.doorwidth = 0;
    this.doorobject = null;
    this.rvaluedoor = 0;
  }


  optionchange() {
    console.log(this.wallobject);
  }

  optionchange1() {
    if (this.windowobject) {
      this.windowwidth = this.windowobject.Width;
      this.windowheight = this.windowobject.Height;
      this.rvavluewindow = this.windowobject.ConstructionRValue;
      this.windowobjectmodellist.push(this.windowobject);
      setTimeout(() => {
        this.windowobject = null;
        this.windowwidth = 0;
        this.windowheight = 0;
        this.rvavluewindow = 0;
      }, 200);

    } else if (this.windowobject === null) {
      this.windowwidth = 0;
      this.windowheight = 0;
      this.rvavluewindow = 0;
    }

  }

  optionchange2() {
    if (this.doorobject) {
      this.doorwidth = this.doorobject.Width;
      this.doorheight = this.doorobject.Height;
      this.rvaluedoor = this.doorobject.ConstructionRValue;
      this.doorobjectmodellist.push(this.doorobject);
      setTimeout(() => {
        this.doorobject = null;
        this.doorwidth = 0;
        this.doorheight = 0;
        this.rvaluedoor = 0;
      }, 200);

    } else if (this.doorobject === null) {
      this.doorwidth = 0;
      this.doorheight = 0;
      this.rvaluedoor = 0;
    }

  }



  onKeyWidthWall(event: any) {
    if (event.target.value === "") {
      this.wallextendobject.Area = 0;
    } else {
      this.wallextendobject.Width = event.target.value;
      this.wallextendobject.Area = Number(this.wallextendobject.Width) * Number(this.wallextendobject.Height);
    }
  }

  onKeyHeightWall(event: any) {
    if (event.target.value === "") {
      this.wallextendobject.Area = 0;
    } else {
      this.wallextendobject.Height = event.target.value;
      this.wallextendobject.Area = Number(this.wallextendobject.Width) * Number(this.wallextendobject.Height);
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


  checkifwindowareamorethanwallarea(): boolean {
    let wallarea = 0;
    if (this.wallextendobject.Area !== null) {
      wallarea = Number(this.wallextendobject.Area);
    }
    let windowarea = 0;
    if (this.windowobjectmodellist.length !== 0) {
      this.windowobjectmodellist.forEach(e => {
        windowarea += e.Area;
      });
    }
    let doorarea = 0;
    if(this.doorobjectmodellist.length !== 0){
      this.doorobjectmodellist.forEach(e => {
        doorarea += e.Area;
      });
    }

    let windowdoorarea = windowarea + doorarea;
    return windowdoorarea > wallarea;
  }


  onSubmitModel() {
    this.wallextendobject.WallName = this.wallobject.WallName;
    this.wallextendobject.ConstructionRValue = this.wallobject.ConstructionRValue;
    if (this.wallextendobject.WallSection === null || this.orientationselect === null ||
      this.wallextendobject.WallName === null || this.wallextendobject.WallName === undefined || this.wallextendobject.Height === 0 ||
      this.wallextendobject.Width === 0) {
      this.toastr.error("Please complete wall information", "Error Message");
    } else if(this.checkifwindowareamorethanwallarea()){
      this.toastr.error("The area of windows and doors is more than wall area! Please make it less!", "Error Message");
    }
    else {
      this.wallwindowdoormodel = {
        Wall: this.wallextendobject,
        Window: this.windowobjectmodellist,
        Door: this.doorobjectmodellist,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID,
        Orientation: this.orientationselect
      };

      console.log(this.wallwindowdoormodel);
      this.buildingmodelservice.wallwindowdoormodelPost(this.wallwindowdoormodel, this.designid).subscribe(res => {
        this.toastr.success("Insert new model successfully", "Info Message");
        this.setdefault();
        this.cleardoor();
        this.display = false;
        this.display1 = false;
        this.display2 = false;
        this.fetchingwallwindowdoormodel();
        this.windowobjectmodellist = [];
        this.doorobjectmodellist = [];
      }, err => {
        this.toastr.error("Insert new model failed", "Info Message");
      });
    }

  }

}
