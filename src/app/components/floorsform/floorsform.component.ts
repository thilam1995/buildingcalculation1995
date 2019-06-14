import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-floorsform',
  templateUrl: './floorsform.component.html',
  styleUrls: ['./floorsform.component.css']
})
export class FloorsformComponent implements OnInit {

  @Input() floorobject: Floors;
  floorobject1: Floors;

  @LocalStorage('floorobjectlist') @Input() floorobjectlist: Floors[];
  fieldArrayfloor: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

  addFieldValue() {
    let doorcontain = this.fieldArrayfloor.find(x => x.FloorName === this.floorobject.FloorName);
    if (this.floorobject.FloorName === null || this.floorobject.ConstructionRValue === null) {
      alert("Please Enter Name and R Value of Wall!");
    } else if(doorcontain){
      alert("The floor name is existed. Please use another name.");
    }
    else {
      this.floorobjectlist.push(this.floorobject);
      this.fieldArrayfloor.push(this.floorobject);
      this.floorobject = {
        FloorName: null,
        ConstructionRValue: null,
        Description: null,
      };
      this.floorobjectlist = this.floorobjectlist;
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
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
    };
    this.floorobjectlist = this.floorobjectlist;
  }

  cancelFieldValue(field) {
    field.isEditable = !field.isEditable;
    this.floorobject1 = {

      FloorName: null,
      ConstructionRValue: null,
      Description: null,

    }
  }

  deleteFieldValue(index: number) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.floorobjectlist.splice(index, 1);
      this.fieldArrayfloor.splice(index, 1);
      this.floorobjectlist = this.floorobjectlist;
    }
  }

}
