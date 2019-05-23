import { Component, OnInit, Input } from '@angular/core';
import { WindowObject } from 'src/app/models/windowobject';
import { Wall } from 'src/app/models/wall';
import { Door } from 'src/app/models/door';

@Component({
  selector: 'app-walldoorwindowmodel',
  templateUrl: './walldoorwindowmodel.component.html',
  styleUrls: ['./walldoorwindowmodel.component.css']
})
export class WalldoorwindowmodelComponent implements OnInit {

  @Input() windowobjectlist: WindowObject[];
  @Input() wallobjectlist: Wall[];
  @Input() doorobjectlist: Door[];
  @Input() wallwindowdoorobject = { wall: null, window: null, door: null, isDisplay: false, buttonshowhide: "Hide" };
  wallwindowdoorobject1 = { wall: null, window: [], door: null };
  @Input() wallwindowdoorobjectlist = [];
  fieldArraywindow: Array<any> = [];
  fieldArraywindow1: Array<WindowObject> = [];
  wallobject: Wall;
  doorobject: Door;
  windowobject: WindowObject;
  wallobject1: Wall;
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


  orientation = ["North", "North North East", "North East", "East North East",
    "South", "South South West", "South West", "West South West",
    "East", "East South East", "South East", "South South East",
    "West", "West North West", "North West", "North North West"];


  constructor() {
  }

  setdefault() {
    this.wallwidth = null;
    this.wallheight = null;
    this.wallarea = 0;
    this.wallobject = {
      WallSection: null,
      WallName: null,
      Height: null,
      Width: null,
      Area: 0,
      ConstructionRValue: 0
    };
    this.doorobject = {
      DoorName: null,
      Area: 0,
      ConstructionRValue: 0,
      Height: null,
      Width: null
    };
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

    this.wallobject1 = {
      WallSection: null,
      WallName: null,
      Height: null,
      Width: null,
      Area: 0,
      ConstructionRValue: 0
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
  }

  ngOnInit() {
    this.setdefault();
  }

  addvaluewindow() {
    this.fieldArraywindow.push(this.windowobject);
    this.windowobject = {
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
    this.windowheight = 0;
    this.windowwidth = 0;
  }

  addvaluewindow1(){
    this.wallwindowdoorobject1.window.push(this.windowobject1);
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

  addFieldValue() {
    // if (this.fieldArraywindow.length === 0 || this.wall_section === null ||
    //   this.wallobject.Width === null || this.wallobject.Height === null) {

    // }
    this.wallobject.Width = this.wallwidth;
    this.wallobject.Height = this.wallheight;
    this.wallobject.Area = this.wallarea;
    this.wallobject.WallSection = this.wall_section;
    this.wallwindowdoorobject.wall = this.wallobject;
    this.wallwindowdoorobject.window = this.fieldArraywindow;
    this.wallwindowdoorobject.door = this.doorobject;
    this.wallwindowdoorobject.buttonshowhide = this.wallwindowdoorobject.isDisplay ? "Hide" : "Show";
    this.wallwindowdoorobjectlist.push(this.wallwindowdoorobject);
    this.fieldArraywindow = [];
    this.setdefault();
    this.wallwindowdoorobject = { wall: null, window: null, door: null, isDisplay: false, buttonshowhide: "Hide" };
    this.windowheight = 0;
    this.windowwidth = 0;
    this.doorheight = 0;
    this.doorwidth = 0;
    this.display = !this.display;
    this.wallwidth = null;
    this.wallheight = null;
    this.wallarea = 0;
    this.wall_section = "";
  }

  optionchange1() {
    this.windowwidth = this.windowobject.Width;
    this.windowheight = this.windowobject.Height;
  }

  optionchange2() {
    this.doorwidth = this.doorobject.Width;
    this.doorheight = this.doorobject.Height;
  }

  optionchange3(wallobject) {
    this.wallobject.ConstructionRValue = Number.parseFloat(wallobject.ConstructionRValue);
    console.log(wallobject);
  }

  optionchange4() {
    this.windowwidth1 = this.windowobject1.Width;
    this.windowheight1 = this.windowobject1.Height;
  }

  optionchange5() {
    this.doorwidth1 = this.doorobject1.Width;
    this.doorheight1 = this.doorobject1.Height;
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
      this.wallobject1.Area = 0;
    } else {
      this.wallobject1.Width = event.target.value;
      this.wallobject1.Area = this.wallobject1.Width * this.wallobject1.Height;
    }
  }

  onKeyHeightWall1(event: any) {
    if (event.target.value === "") {
      this.wallobject1.Area = 0;
    } else {
      this.wallobject1.Height = event.target.value;
      this.wallobject1.Area = this.wallobject1.Width * this.wallobject1.Height;
    }
  }

  toggle(wallwindowdoori) { //
    wallwindowdoori.isDisplay1 = !wallwindowdoori.isDisplay1;
  }

  addwalltoggle() { //
    this.display = !this.display; //Add wall
    //console.log(this.wallwindowdoorobjectlist.length);
  }

  hideorshow(wallwindowdoori) {//Show breakdown of heat loss
    wallwindowdoori.isDisplay = !wallwindowdoori.isDisplay;
    wallwindowdoori.buttonshowhide = wallwindowdoori.isDisplay ? "Hide" : "Show";
  }

  onEdit(wallwindowdoori, index: number) { //Get data to edit
    wallwindowdoori.isEditable = !wallwindowdoori.isEditable;
    this.wallwindowdoorobject1 = this.wallwindowdoorobjectlist[index];
    this.wallobject1 = this.wallwindowdoorobject1.wall;
    this.wall_section1 = this.wallobject1.WallSection;
    this.doorobject1 = this.wallwindowdoorobject1.door;
    this.doorwidth1 = this.doorobject1.Width;
    this.doorheight1 = this.doorobject1.Height;
  }

  onSave(wallwindowdoori, index: number) { //Save the model after editing
    wallwindowdoori.isEditable = !wallwindowdoori.isEditable;
    this.wallobject1.WallSection = this.wall_section1;
    this.wallwindowdoorobjectlist[index].wall = this.wallobject1;
    this.wallwindowdoorobjectlist[index].window = this.wallwindowdoorobject1.window;
    this.wallwindowdoorobjectlist[index].door = this.doorobject1;
    //this.wallwindowdoorobject1.window = [];
    this.wall_section1 = "";
    this.wallobject1 = {
      WallSection: null,
      WallName: null,
      Height: 0,
      Width: 0,
      Area: 0,
      ConstructionRValue: 0
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
  }

  onDelete(index: number) {//Delete model from list
    this.wallwindowdoorobjectlist.splice(index, 1);
  }

  onCancel(wallwindowdoori) { //Cancel if user don't want to edit
    wallwindowdoori.isEditable = !wallwindowdoori.isEditable;
  }


  deletewindow(index: number) { //Delete window during editing model
    this.wallwindowdoorobject1.window.splice(index, 1);
  }
}
