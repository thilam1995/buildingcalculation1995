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
    this.wallextendobject = null;
  }

  selecttoEdit(i: any) {
    this.isedit = true;

    this.wallextendobject = Object.assign({}, i.data.Wall);
    console.log(this.wallextendobject);
    this.windowobjectmodellist = i.data.Window;
    this.doorobject = Object.assign({}, i.data.Door);
    this.doorheight = this.doorobject.Height;
    this.doorwidth = this.doorobject.Width;
    this.rvaluedoor = this.doorobject.ConstructionRValue;
    this.wallobject = {
      WallName: this.wallextendobject.WallName,
      ConstructionRValue: this.wallextendobject.ConstructionRValue
    };
  }

  onCancel() {
    this.isedit = false;
  }

  updateselectedmodel(id: string) {
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
  compareFnDoor(a, b) {
    return a && b && a.DoorName === b.DoorName && a.ConstructionRValue === b.ConstructionRValue;
  }

  updatewindowvalue(window: any) {

    let result = this.windowobjectlist.find(x =>
      x.data.WindowName === window.WindowName
    );


    window = result.data;

    console.log(window);
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


  fetchingwalldata() {
    // this.wallservice.walllistdata(this.designid).subscribe(res => {
    //   this.wallobjectlist = res;
    // }, err => {
    //   this.toastr.error("Something Wrong!", "Error Message")
    // });
    this.wallservice.walllistdata(this.designid);
  }

  fetchingwindowdata() {
    // this.wallservice.windowlistdata(this.designid).subscribe(res => {
    //   this.windowobjectlist = res;
    // }, err => {
    //   this.toastr.error("Something wrong", "Error Message!");
    // });
    this.wallservice.windowlistdata(this.designid);
  }

  fetchingdoordata() {
    // this.wallservice.doorlistdata(this.designid).subscribe(res => {
    //   this.doorobjectlist = res;

    // }, err => {
    //   this.toastr.error("Something wrong", "Error Message!");
    // });
    this.wallservice.doorlistdata(this.designid);
  }

}
