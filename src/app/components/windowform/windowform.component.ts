import { Component, OnInit, Input } from '@angular/core';
import { WindowObject } from 'src/app/models/windowobject';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-windowform',
  templateUrl: './windowform.component.html',
  styleUrls: ['./windowform.component.css']
})
export class WindowformComponent implements OnInit {

  @Input() windowobject: WindowObject;
  @Input() windowobjectlist: WindowObject[];
  windowobject1: WindowObject;
  fieldArray: Array<any> = [];
  owaList = [0, 0.05, 0.1, 0.15, 0.2, 0.25,
    0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
    0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];

  shadeList = [
    { percentage: 0, shade: "Unshaded" },
    { percentage: 0.25, shade: "shaded" },
    { percentage: 0.5, shade: "shaded" },
    { percentage: 0.75, shade: "shaded" },
    { percentage: 1, shade: "Fully shaded" }
  ];
  constructor() { }

  ngOnInit() {
  }

  addFieldValue() {
    if (this.windowobject.WindowName === "" || this.windowobject.ConstructionRValue === null
      || this.windowobject.Height === null || this.windowobject.Width === null
      || this.windowobject.OWA === null) {
      alert("Please add window by complete filling all details");
    } else {
      this.fieldArray.push(this.windowobject);
      this.windowobjectlist.push(this.windowobject);
      this.windowobject = {
        WindowName: null,
        ConstructionRValue: null,
        Width: null,
        Height: null,
        Area: 0,
        ID: null,
        OWA: 0,
        WindowHeatLoss: 0,
        ShadePercent: 0
      };
    }
  }

  editFieldValue(index: number, field) {
    field.isEditable = !field.isEditable;
    this.windowobject1 = this.windowobjectlist[index];
  }

  saveFieldValue(index: number, field) {
    field.isEditable = !field.isEditable;
    this.windowobjectlist[index] = this.windowobject1;
    this.fieldArray[index] = this.windowobject1;
    this.windowobject1 = {
      WindowName: null,
      ConstructionRValue: null,
      Width: null,
      Height: null,
      Area: 0,
      ID: null,
      OWA: 0,
      WindowHeatLoss: 0,
      ShadePercent: 0
    };
  }

  cancelFieldValue(field) {
    field.isEditable = !field.isEditable;
    this.windowobject1 = {
      WindowName: null,
      ConstructionRValue: null,
      Width: 0,
      Height: 0,
      Area: 0,
      ID: null,
      OWA: 0,
      WindowHeatLoss: 0,
      ShadePercent: 0
    };
  }

  deleteFieldValue(index: number) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.fieldArray.splice(index, 1);
      this.windowobjectlist.splice(index, 1);
    }
  }

  onKeyWidth(event: any) { // without type info
    if (event.target.value === "") {
      this.windowobject.Area = 0;
    } else {
      this.windowobject.Width = event.target.value;
      this.windowobject.Area = this.windowobject.Width * this.windowobject.Height
    }

  }

  onKeyHeight(event: any) { // without type info
    if (event.target.value === "") {
      this.windowobject.Area = 0;
    } else {
      this.windowobject.Height = event.target.value;
      this.windowobject.Area = this.windowobject.Width * this.windowobject.Height
    }

  }

  onKeyWidthEdit(event: any) {
    if (event.target.value === "") {
      this.windowobject1.Area = 0;
    } else {
      this.windowobject1.Width = event.target.value;
      this.windowobject1.Area = this.windowobject1.Width * this.windowobject1.Height
    }
  }

  onKeyHeightEdit(event: any) {
    if (event.target.value === "") {
      this.windowobject1.Area = 0
    } else {
      this.windowobject1.Height = event.target.value;
      this.windowobject1.Area = this.windowobject1.Width * this.windowobject1.Height
    }
  }
}
