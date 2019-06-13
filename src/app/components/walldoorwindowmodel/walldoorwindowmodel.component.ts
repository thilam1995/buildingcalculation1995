import { Component, OnInit, Input } from '@angular/core';
import { WindowObject } from 'src/app/models/windowobject';
import { Wall } from 'src/app/models/wall';
import { WallExtend } from 'src/app/models/wallextend';
import { Door } from 'src/app/models/door';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-walldoorwindowmodel',
  templateUrl: './walldoorwindowmodel.component.html',
  styleUrls: ['./walldoorwindowmodel.component.css']
})
export class WalldoorwindowmodelComponent implements OnInit {

  @Input() windowobjectlist: WindowObject[];
  @Input() wallobjectlist: Wall[];
  @Input() doorobjectlist: Door[];
  wallwindowdoorobject = { wall: null, window: null, door: null, isDisplay: false, buttonshowhide: "Hide" };
  @Input() wallwindowdoorobjectlist = [];
  fieldArraywindow: Array<any> = [];
  fieldArraywindow1: Array<WindowObject> = [];
  wallobject: Wall;
  wallextendobject: WallExtend;
  doorobject: Door;
  windowobject: WindowObject;
  wallobject1: Wall;
  wallextendobject1: WallExtend;
  doorobject1: Door;
  windowobject1: WindowObject;
  wall_section: string = "";
  wall_section1: string = "";
  wallwidth = 0;
  wallheight = 0;
  wallwidth1 = 0;
  wallheight1 = 0;
  wallarea = 0;
  wallarea1 = 0;
  doorwidth = 0;
  doorheight = 0;
  doorwidth1 = 0;
  doorheight1 = 0;
  windowwidth = 0;
  windowheight = 0;
  windowwidth1 = 0;
  windowheight1 = 0;
  display: boolean = false;
  display1: boolean = false;
  display2: boolean = false;
  orientationselect: string;
  orientationselect1: string;
  wallname: string;
  wallname1: string;

  orientation = ["North", "North North East", "North East", "East North East",
    "South", "South South West", "South West", "West South West",
    "East", "East South East", "South East", "South South East",
    "West", "West North West", "North West", "North North West"];


  constructor(private toastr: ToastrService) {
  }

  setdefault() {
    this.wallwidth = null;
    this.wallheight = null;
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
    // this.doorobject = {
    //   DoorName: null,
    //   Area: null,
    //   ConstructionRValue: null,
    //   Height: null,
    //   Width: null
    // };
    this.windowobject = {
      WindowName: null,
      ConstructionRValue: 0,
      Width: null,
      Height: null,
      Area: 0,
      ID: null,
      OWA: 0,
      WindowHeatLoss: 0,
      ShadePercent: 0
    };

    this.wallextendobject1 = {
      WallSection: null,
      WallName: null,
      Height: null,
      Width: null,
      Area: 0,
      ConstructionRValue: 0,
      Orientation: null,
      Description: null
    };
    this.doorobject1 = {
      DoorName: null,
      Area: 0,
      ConstructionRValue: 0,
      Height: 0,
      Width: 0
    };
    this.windowobject1 = {
      WindowName: null,
      ConstructionRValue: 0,
      Width: 0,
      Height: 0,
      Area: 0,
      ID: null,
      OWA: 0,
      WindowHeatLoss: 0,
      ShadePercent: 0
    };
    this.orientationselect = null;
    this.orientationselect1 = null;
    this.wallextendobject = null;
  }

  ngOnInit() {
    this.setdefault();
  }

  addvaluewindow() {
    if (this.windowobject.Width === null && this.windowobject.Height === null) {
      this.toastr.error("Please select window! Don't leave it blank", "Building Model");
    } else {
      this.fieldArraywindow.push(this.windowobject);
      this.windowobject = {
        WindowName: null,
        ConstructionRValue: 0,
        Width: null,
        Height: null,
        Area: 0,
        ID: null,
        OWA: 0,
        WindowHeatLoss: 0,
        ShadePercent: 0
      };
      this.windowheight = 0;
      this.windowwidth = 0;
    }
  }

  addvaluewindow1() {
    if (this.windowobject1.Width === null && this.windowobject1.Height === null) {
      this.toastr.error("Please select window! Don't leave it blank", "Building Model");
    } else {
      this.fieldArraywindow1.push(this.windowobject1);
      this.windowobject1 = {
        WindowName: null,
        ConstructionRValue: 0,
        Width: null,
        Height: null,
        Area: 0,
        ID: null,
        OWA: 0,
        WindowHeatLoss: 0,
        ShadePercent: 0
      };
      this.windowheight1 = 0;
      this.windowwidth1 = 0;
    }

  }

  addFieldValue() {
    if (this.wallarea === 0 || this.wallheight === null || this.wallwidth === null || this.wallobject.ConstructionRValue === null ||
      this.orientationselect === null || this.wall_section === null || this.wallname === null) {
      this.toastr.error("Error! You need to add wall and door!", "Building Model Message");
    } else {
      this.wallextendobject = {
        Area: this.wallarea,
        Height: this.wallheight,
        Width: this.wallwidth,
        ConstructionRValue: this.wallobject.ConstructionRValue,
        Orientation: this.orientationselect,
        WallSection: this.wall_section,
        WallName: this.wallobject.WallName,
        Description: this.wallobject.Description
      }
      //console.log(this.wallextendobject);
      this.wallwindowdoorobject.wall = this.wallextendobject;
      //console.log(this.fieldArraywindow);
      this.wallwindowdoorobject.window = this.fieldArraywindow;
      //console.log(this.doorobject);
      this.wallwindowdoorobject.door = this.doorobject;
      this.wallwindowdoorobject.buttonshowhide = this.wallwindowdoorobject.isDisplay ? "Hide" : "Show";
      this.wallwindowdoorobjectlist.push(this.wallwindowdoorobject);
      this.fieldArraywindow = [];
      this.wallwindowdoorobject = { wall: null, window: null, door: null, isDisplay: false, buttonshowhide: "Hide" };
      this.setdefault();
      this.windowheight = 0;
      this.windowwidth = 0;
      this.doorheight = 0;
      this.doorwidth = 0;
      this.display = false;
      this.display1 = false;
      this.display2 = false;
      this.wallwidth = null;
      this.wallheight = null;
      this.wallarea = 0;
      this.wall_section = null;
      this.wallname = null;
    }
  }

  optionchange1() {
    this.windowwidth = this.windowobject.Width;
    this.windowheight = this.windowobject.Height;
  }

  optionchange2() {
      this.doorwidth = this.doorobject.Width;
      this.doorheight = this.doorobject.Height;
  }

  optionchange3() {
    this.wallobject = this.wallobjectlist.find(x =>
      x.WallName === this.wallname
    );
    console.log(this.wallobject);
  }

  optionchange4() {
    this.windowwidth1 = this.windowobject1.Width;
    this.windowheight1 = this.windowobject1.Height;
  }

  optionchange5() {
      this.doorwidth1 = this.doorobject1.Width;
      this.doorheight1 = this.doorobject1.Height;
  }

  optionchange6() {
    this.wallobject1 = this.wallobjectlist.find(x =>
      x.WallName === this.wallname1
    );
    console.log(this.wallobject1);
  }

  deleteFieldValuewindow(index: number) {
    this.fieldArraywindow.splice(index, 1)
  }

  onKeyWidthWall(event: any) {
    if (event.target.value === "") {
      this.wallarea = 0;
    } else {
      this.wallwidth = event.target.value;
      this.wallarea = this.wallwidth * this.wallheight;
    }
  }

  onKeyHeightWall(event: any) {
    if (event.target.value === "") {
      this.wallarea = 0;
    } else {
      this.wallheight = event.target.value;
      this.wallarea = this.wallwidth * this.wallheight;
    }
  }

  onKeyWidthWall1(event: any) {
    if (event.target.value === "") {
      this.wallarea1 = 0;
    } else {
      this.wallwidth1 = event.target.value;
      this.wallarea1 = this.wallwidth1 * this.wallheight1;
    }
  }

  onKeyHeightWall1(event: any) {
    if (event.target.value === "") {
      this.wallarea1 = 0;
    } else {
      this.wallheight1 = event.target.value;
      this.wallarea1 = this.wallwidth1 * this.wallheight1;
    }
  }

  toggle(wallwindowdoori) { //
    wallwindowdoori.isDisplay1 = !wallwindowdoori.isDisplay1;
  }

  addwalltoggle() { //
    this.display = !this.display; //Add wall
    //console.log(this.wallwindowdoorobjectlist.length);
    if (!this.display) {
      this.wallwidth = null;
      this.wallheight = null;
      this.wallarea = 0;
      this.wallextendobject = {
        WallSection: null,
        WallName: null,
        Height: null,
        Width: null,
        Area: 0,
        ConstructionRValue: 0,
        Orientation: null
      };
      this.wallname = null;
      this.wall_section = null;
    }
  }

  addwindowtoggle() {
    this.display1 = !this.display1;
    if (!this.display1) {
      this.fieldArraywindow = [];
      this.windowobject = null;
      this.windowwidth = 0;
      this.windowheight = 0;
    }
  }

  adddoortoggle() {
    this.display2 = !this.display2;
    if (!this.display2) {
      this.doorobject = null;
      this.doorheight = 0;
      this.doorwidth = 0;
    }
  }

  hideorshow(wallwindowdoori) {//Show breakdown of heat loss
    wallwindowdoori.isDisplay = !wallwindowdoori.isDisplay;
    wallwindowdoori.buttonshowhide = wallwindowdoori.isDisplay ? "Hide" : "Show";
  }

  onEdit(index: number) { //Get data to edit
    console.log(index);
    //this.wallwindowdoorobject1 = this.wallwindowdoorobjectlist[index];
    this.wallextendobject1 = this.wallwindowdoorobjectlist[index].wall;
    // let wallobject: Wall = {
    //   ConstructionRValue: this.wallextendobject1.ConstructionRValue,
    //   Description: this.wallextendobject1.Description,
    //   WallName: this.wallextendobject1.WallName
    // }
    // this.wallobject1 = wallobject;
    this.wallname1 = this.wallextendobject1.WallName;
    console.log(this.wallobject1);
    this.wall_section1 = this.wallextendobject1.WallSection;
    this.orientationselect1 = this.wallextendobject1.Orientation;
    this.wallheight1 = this.wallextendobject1.Height;
    this.wallwidth1 = this.wallextendobject1.Width;
    this.wallarea1 = this.wallextendobject1.Area;
    this.wallobject1 = this.wallobjectlist.find(x =>
      x.WallName === this.wallname1
    );
    this.fieldArraywindow1 = this.wallwindowdoorobjectlist[index].window;
    this.doorobject1 = this.wallwindowdoorobjectlist[index].door;
    this.doorwidth1 = this.doorobject1.Width;
    this.doorheight1 = this.doorobject1.Height;
    this.wallwindowdoorobjectlist[index].isEditable = !this.wallwindowdoorobjectlist[index].isEditable;
  }

  onSave(index: number) { //Save the model after editing
    console.log(index);

    this.wallextendobject1.WallSection = this.wall_section1;
    this.wallextendobject1.Orientation = this.orientationselect1;
    this.wallextendobject1.Width = this.wallwidth1;
    this.wallextendobject1.Height = this.wallheight1;
    this.wallextendobject1.Area = this.wallarea1;
    this.wallextendobject1 = {
      Area: this.wallarea1,
      ConstructionRValue: this.wallobject1.ConstructionRValue,
      Description: this.wallobject1.Description,
      Height: this.wallheight1,
      Orientation: this.orientationselect1,
      WallName: this.wallobject1.WallName,
      WallSection: this.wall_section1,
      Width: this.wallwidth1
    }
    this.wallwindowdoorobjectlist[index].wall = null;
    this.wallwindowdoorobjectlist[index].wall = this.wallextendobject1;
    this.wallwindowdoorobjectlist[index].window = [];
    this.wallwindowdoorobjectlist[index].window = this.fieldArraywindow1;
    this.wallwindowdoorobjectlist[index].door = null;
    this.wallwindowdoorobjectlist[index].door = this.doorobject1;
    this.fieldArraywindow1 = [];
    this.wallwindowdoorobjectlist[index].isEditable = !this.wallwindowdoorobjectlist[index].isEditable;
    this.wall_section1 = null;
    this.wallobject1 = {
      WallName: null,
      ConstructionRValue: 0,
      Description: null
    };
    this.doorobject1 = {
      DoorName: null,
      Area: 0,
      ConstructionRValue: 0,
      Height: 0,
      Width: 0
    };
    this.windowobject1 = {
      WindowName: null,
      ConstructionRValue: 0,
      Width: null,
      Height: null,
      Area: 0,
      ID: null,
      OWA: 0,
      WindowHeatLoss: 0,
      ShadePercent: 0
    };

    this.wallextendobject1 = null;
  }

  onDelete(index: number) {//Delete model from list
    this.wallwindowdoorobjectlist.splice(index, 1);
  }

  onCancel(index: number) { //Cancel if user don't want to edit
    this.wallwindowdoorobjectlist[index].isEditable = !this.wallwindowdoorobjectlist[index].isEditable;
    this.wallextendobject1 = {
      WallSection: null,
      WallName: null,
      Height: null,
      Width: null,
      Area: 0,
      ConstructionRValue: 0,
      Orientation: null
    };
    this.wall_section1 = "";
    this.wallname1 = "";
    this.wallobject1 = {
      WallName: null,
      ConstructionRValue: 0,
      Description: null
    };
    this.doorobject1 = {
      DoorName: null,
      Area: 0,
      ConstructionRValue: 0,
      Height: 0,
      Width: 0
    };
    this.windowobject1 = {
      WindowName: null,
      ConstructionRValue: 0,
      Width: null,
      Height: null,
      Area: 0,
      ID: null,
      OWA: 0,
      WindowHeatLoss: 0,
      ShadePercent: 0
    };

    this.wallextendobject1 = null;

  }


  deletewindow(index: number) { //Delete window during editing model
    this.fieldArraywindow1.splice(index, 1);
  }

  loglist() {
    console.log(this.wallwindowdoorobjectlist);
  }
}
