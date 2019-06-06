import { Component, OnInit, Input } from '@angular/core';
import { Door } from 'src/app/models/door';

@Component({
  selector: 'app-doorform',
  templateUrl: './doorform.component.html',
  styleUrls: ['./doorform.component.css']
})
export class DoorformComponent implements OnInit {

  @Input() doorobject: Door;
  doorobject1: Door;
  @Input() doorobjectlist: Door[];
  fieldArray: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

  addFieldValue() {

    let doorcontain = this.fieldArray.find(x => x.DoorName === this.doorobject.DoorName);
    let doorcontain1 = this.doorobjectlist.find(x => x.DoorName === this.doorobject.DoorName);
    if (this.doorobject.DoorName === "" || this.doorobject.ConstructionRValue === null
      || this.doorobject.Height === null || this.doorobject.Width === null) {
      alert("Please add door by complete filling all details");
    } else if(doorcontain || doorcontain1){
      alert("The door name is existed. Please use another name.");
    }
    else {
      this.fieldArray.push(this.doorobject);
      this.doorobjectlist.push(this.doorobject);
      this.doorobject = {
        DoorName: null,
        Area: 0,
        ConstructionRValue: null,
        Height: null,
        Width: null
      };
    }

  }

  editFieldValue(index: number, field) {
    field.isEditable = !field.isEditable;
    this.doorobject1 = this.doorobjectlist[index];
  }

  saveFieldValue(index: number, field) {
    this.fieldArray[index] = this.doorobject1;
    this.doorobjectlist[index] = this.doorobject1;
    field.isEditable = !field.isEditable;
    this.doorobject1 = {
      DoorName: null,
      Area: 0,
      ConstructionRValue: null,
      Height: null,
      Width: null
    };
  }

  cancelFieldValue(field) {
    field.isEditable = !field.isEditable;
    this.doorobject1 = {
      DoorName: null,
      Area: 0,
      ConstructionRValue: null,
      Height: null,
      Width: null
    };
  }

  deleteFieldValue(index: number) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.fieldArray.splice(index, 1);
      this.doorobjectlist.splice(index, 1);
    }
  }

  onKeyWidth(event: any) { // without type info
    if (event.target.value === "") {
      this.doorobject.Area = 0;
    } else {
      this.doorobject.Width = event.target.value;
      this.doorobject.Area = this.doorobject.Width * this.doorobject.Height;
    }

  }

  onKeyHeight(event: any) { // without type info
    if (event.target.value === "") {
      this.doorobject.Area = 0;
    } else {
      this.doorobject.Height = event.target.value;
      this.doorobject.Area = this.doorobject.Width * this.doorobject.Height;
    }

  }

  onKeyWidthEdit(event: any) {
    if (event.target.value === "") {
      this.doorobject1.Area = 0;
    } else {
      this.doorobject1.Width = event.target.value;
      this.doorobject1.Area = this.doorobject1.Width * this.doorobject1.Height;
    }

  }

  onKeyHeightEdit(event: any) {
    if (event.target.value === "") {
      this.doorobject1.Area = 0;
    } else {
      this.doorobject1.Height = event.target.value;
      this.doorobject1.Area = this.doorobject1.Width * this.doorobject1.Height;
    }

  }
}
