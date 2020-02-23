import { Component, OnInit, Input } from '@angular/core';
import { Register } from 'src/app/models/register';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { Wall } from 'src/app/models/wall';
import { WallExtend } from 'src/app/models/wallextend';
import { Door } from 'src/app/models/door';
import { WindowObject } from 'src/app/models/windowobject';
import { Wallwindowdoormodel } from 'src/app/models/wallwindowdoormodel';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';

@Component({
  selector: 'app-walldoorwindowmodelitem',
  templateUrl: './walldoorwindowmodelitem.component.html',
  styleUrls: ['./walldoorwindowmodelitem.component.css']
})
export class WalldoorwindowmodelitemComponent implements OnInit {

  orientationselect: string = "";
  windowobjectlist = [];
  wallobjectlist = [];
  doorobjectlist = [];

  wallwidth = 0;
  wallheight = 0;
  wallarea = 0;
  doorwidth = 0;
  doorheight = 0;
  rvaluedoor = 0;
  windowwidth = 0;
  windowheight = 0;
  rvavluewindow = 0;

  wallobject: Wall;
  wallextendobject: WallExtend;
  doorobject: Door;
  windowobject: WindowObject;
  wallwindowdoormodel: Wallwindowdoormodel;
  windowobjectmodellist = [];
  doorobjectmodellist = [];

  registeruser: Register;

  orientation = ["North", "South", "East", "West"];


  isedit: boolean = false;
  isdisplay: boolean = false;
  @Input() i: any;


  projectid: string = "";
  designid: string = "";

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

  ngOnInit() {
    this.setdefault();
    this.fetchingwalldata();
    this.fetchingwindowdata();
    this.fetchingdoordata();
  }

  toggle() {
    this.isdisplay = !this.isdisplay
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
    this.wallextendobject = {
      WallSection: null,
      WallName: null,
      Height: null,
      Width: null,
      Area: null,
      ConstructionRValue: null,
    };
    this.doorobject = null;
    this.windowobject = {
      WindowName: null,
      ConstructionRValue: 0,
      Width: null,
      Height: null,
      Area: 0,
      ID: null,
      OWA: 0
    };
    this.wallextendobject = null;
    this.orientationselect = "";
  }

  selecttoEdit(i: any) {
    this.isedit = true;
    if(this.isdisplay){
      this.isdisplay = false;
    }
    this.wallextendobject = Object.assign({}, i.data.Wall);
    console.log(this.wallextendobject);
    this.windowobjectmodellist = i.data.Window;
    this.doorobjectmodellist = i.data.Door;
    this.wallobject = {
      WallName: this.wallextendobject.WallName,
      ConstructionRValue: this.wallextendobject.ConstructionRValue
    };
    this.orientationselect = i.data.Orientation;
  }

  onCancel() {
    this.isedit = false;
  }

  updateselectedmodel(id: string) {
    this.wallextendobject.WallName = this.wallobject.WallName;
    this.wallextendobject.ConstructionRValue = this.wallobject.ConstructionRValue;
    if (this.wallextendobject.WallSection === null || this.orientation === null ||
      this.wallextendobject.WallName === null || this.wallextendobject.WallName === undefined || this.wallextendobject.Height === 0 ||
      this.wallextendobject.Width === 0) {
      this.toastr.error("Please complete wall information", "Error Message");
    } else if(this.checkifwindowareamorethanwallarea()){
      this.toastr.error("The area of windows and doors is more than wall area! Please make it less!", "Error Message");
    } else {
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
      this.buildingmodelservice.wallwindowdoormodelUpdate(id, this.wallwindowdoormodel, this.designid).subscribe(res => {
        this.toastr.success("Update model successfully", "Info Message");
        this.setdefault();

        this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
      }, err => {
        this.toastr.error("Update model failed", "Info Message");
      });
    }
  }

  deleleselectmodel(id: string) {
    if (confirm("Do you want to delete this section") === true) {
      this.buildingmodelservice.wallwindowdoormodelDelete(id, this.designid).subscribe(res => {
        this.toastr.success("Delete Successfully", "Info");
        this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
      }, err => {
        this.toastr.error("Delete Failed", "Error");
      });
    }
  }

  compareFn(a, b) {
    //console.log(JSON.stringify(a) + " " + JSON.stringify(b));
    return a && b && a.WallName === b.WallName && a.ConstructionRValue === b.ConstructionRValue;
  }




  onKeyWidthWall(event: any) {
    if (event.target.value === "") {
      this.wallextendobject.Area = 0;
    } else {
      this.wallextendobject.Width = Number(event.target.value);
      this.wallextendobject.Area = Number(this.wallextendobject.Width * this.wallextendobject.Height);
    }
  }

  deletewindow(index: number) { //Delete window during editing model
    if (confirm("Do you want to delete this section") === true) {
      this.windowobjectmodellist.splice(index, 1);
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


  addvaluewindow() {
    if (this.windowobject) {
      this.windowobjectmodellist.push(this.windowobject);
      console.log(this.windowobjectmodellist);
      this.windowobject = null;
      this.windowheight = 0;
      this.windowwidth = 0;
      this.rvavluewindow = 0;
    }else if(this.windowobject === null){
      this.toastr.error("Window cannot be null!");
    }
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

    } else if (this.doorobject === null){
      this.doorwidth = 0;
      this.doorheight = 0;
      this.rvaluedoor = 0;
    }

  }

  deletedoor(index: number) {
    if (confirm("Do you want to delete this section?") === true) {
      this.doorobjectmodellist.splice(index, 1);
    }
  }


  fetchingwalldata() {
    this.wallservice.walllistdata(this.designid);
  }

  fetchingwindowdata() {
    this.wallservice.windowlistdata(this.designid);
  }

  fetchingdoordata() {
    this.wallservice.doorlistdata(this.designid);
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

}
