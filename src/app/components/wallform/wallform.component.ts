import { Component, OnInit, Input } from '@angular/core';
import { Wall } from 'src/app/models/wall';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-wallform',
  templateUrl: './wallform.component.html',
  styleUrls: ['./wallform.component.css']
})
export class WallformComponent implements OnInit {

  @Input() wallobject: Wall;
  @Input() wallobjectlist: Wall[];
  wallobject1: Wall;
  fieldArray: Array<any> = [];
  constructor() {
    this.wallobject1 = {
      WallName: null,
      ConstructionRValue: null,
      Description: null,
      Area: 0,
      Height: null,
      Width: null
    };
  }

  ngOnInit() {
  }

  addFieldValue() {
    if (this.wallobject.ConstructionRValue === null || this.wallobject.WallName === "") {
      alert("Please complete the blank!");
    } else {
      this.fieldArray.push(this.wallobject);
      this.wallobjectlist.push(this.wallobject);
      this.wallobject = {
        WallName: null,
        ConstructionRValue: null,
        Description: null,
        Area: 0,
        Height: null,
        Width: null
      };
    }

  }

  editFieldValue(index: number, field) {
    field.isEditable = !field.isEditable;
    this.wallobject1 = this.wallobjectlist[index];
  }

  saveFieldValue(index: number, field) {
    field.isEditable = !field.isEditable;
    this.wallobjectlist[index] = this.wallobject1;
    this.fieldArray[index] = this.wallobject1;
    this.wallobject1 = {
      ConstructionRValue: null,
      Description: null,
      WallName: null,
      Area: 0,
      Height: null,
      Width: null
    }
  }

  cancelFieldValue(field) {
    field.isEditable = !field.isEditable;
    this.wallobject1 = {
      ConstructionRValue: 0,
      Description: null,
      WallName: null,
      Area: 0,
      Height: null,
      Width: null
    }
  }

  deleteFieldValue(index: number) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.fieldArray.splice(index, 1);
      this.wallobjectlist.splice(index, 1);
    }
  }

}
