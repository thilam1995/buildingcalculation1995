import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';

@Component({
  selector: 'app-floorsform',
  templateUrl: './floorsform.component.html',
  styleUrls: ['./floorsform.component.css']
})
export class FloorsformComponent implements OnInit {

  @Input() floorobject: Floors;
  floorobject1: Floors;

  @Input() floorobjectlist: Floors[];
  fieldArrayfloor: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

  addFieldValue() {
    if(this.floorobject.FloorName === null || this.floorobject.ConstructionRValue === null){
      alert("Please Enter Name and R Value of Wall!");
    }else{
      this.floorobjectlist.push(this.floorobject);
      this.fieldArrayfloor.push(this.floorobject);
      this.floorobject = {
        FloorSection: null,
        FloorName: null,
        ConstructionRValue: null,
        Description: null,
        ExposedArea: null
      }
    }

  }

  editFieldValue(index: number, field) {
    field.isEditable = !field.isEditable;
    this.floorobject1 = this.floorobjectlist[index];
  }

  saveFieldValue(index: number, field) {
    this.floorobjectlist[index] = this.floorobject1;
    this.fieldArrayfloor[index] = this.floorobject1;
    field.isEditable = !field.isEditable;
    this.floorobject1 = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
      ExposedArea: null
    }
  }

  cancelFieldValue(field) {
    field.isEditable = !field.isEditable;
    this.floorobject1 = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
      ExposedArea: null
    }
  }

  deleteFieldValue(index: number) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.floorobjectlist.splice(index, 1);
      this.fieldArrayfloor.splice(index, 1);
    }
  }

}
