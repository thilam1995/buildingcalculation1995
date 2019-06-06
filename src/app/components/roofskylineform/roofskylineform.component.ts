import { Component, OnInit, Input } from '@angular/core';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';

@Component({
  selector: 'app-roofskylineform',
  templateUrl: './roofskylineform.component.html',
  styleUrls: ['./roofskylineform.component.css']
})
export class RoofskylineformComponent implements OnInit {

  @Input() skylightsobject: Skylights;
  @Input() roofobject: Roof;
  roofobject1: Roof;
  skylightsobject1: Skylights;

  @Input() skylightsobjectlist: Skylights[];
  @Input() roofobjectlist: Roof[];

  fieldArrayroof: Array<any> = [];
  fieldArrayskylight: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

  editFieldValueRoof(index: number, field) {
    field.isEditable = !field.isEditable;
    this.roofobject1 = this.roofobjectlist[index];
  }

  saveFieldValueRoof(index: number, field) {
    this.fieldArrayroof[index] = this.roofobject1;
    this.roofobjectlist[index] = this.roofobject1;
    field.isEditable = !field.isEditable;
    this.roofobject1 = {
      RoofSection: null,
      Description: null,
      ConstructionRValue: null,
      RoofName: null
    };
  }

  cancelFieldValueRoof(field) {
    field.isEditable = !field.isEditable;
    this.roofobject1 = {
      RoofSection: null,
      Description: null,
      ConstructionRValue: null,
      RoofName: null
    };
  }

  deleteFieldValueRoof(index: number) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.roofobjectlist.splice(index, 1);
      this.fieldArrayroof.splice(index, 1);
    }
  }

  addFieldValueRoof() {
    let roofcontain = this.fieldArrayroof.find(x => x.RoofName === this.roofobject.RoofName);
    let roofcontain1 = this.roofobjectlist.find(x => x.RoofName === this.roofobject.RoofName);
    if (this.roofobject.RoofName === null || this.roofobject.ConstructionRValue === null) {
      alert("Please add roof by complete filling all details");
    } else if(roofcontain || roofcontain1){
      alert("The roof name is existed. Please use another name.");
    }
    else {
      this.roofobjectlist.push(this.roofobject);
      this.fieldArrayroof.push(this.roofobject);
      this.roofobject = {
        RoofSection: null,
        Description: null,
        ConstructionRValue: null,
        RoofName: null
      };
    }

  }

  editFieldValueSkylight(index: number, field) {
    field.isEditable = !field.isEditable;
  }

  saveFieldValueSkylight(index: number, field) {
    this.fieldArrayskylight[index] = this.skylightsobject1;
    this.skylightsobjectlist[index] = this.skylightsobject1;
    this.skylightsobject1 = {
      Area: 0,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      HeatLoss: 0
    };
  }

  cancelFieldValueSkylight(field) {
    field.isEditable = !field.isEditable;
    this.skylightsobject1 = {
      Area: 0,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      HeatLoss: 0
    };
  }

  deleteFieldValueSkylight(index: number) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.fieldArrayskylight.splice(index, 1);
      this.skylightsobjectlist.splice(index, 1);
    }
  }

  addFieldValueSkylight() {
    let skylightcontain = this.fieldArrayskylight.find(x => x.SkylightsName === this.skylightsobject.SkylightsName);
    let skylightcontain1 = this.skylightsobjectlist.find(x => x.SkylightsName === this.skylightsobject.SkylightsName);
    if (this.skylightsobject.SkylightsName === "" || this.skylightsobject.ConstructionRValue === null
      || this.skylightsobject.Length === null || this.skylightsobject.Width === null) {
      alert("Please complete detail of Skylight!")
    } else if (this.skylightsobject.Length < 0 || this.skylightsobject.Width < 0 || this.skylightsobject.Area < 0) {
      alert("The Width, Height and Area should not be negative.")
    } else if(skylightcontain || skylightcontain1){
      alert("The floor name is existed. Please use another name.");
    }
    else {
      this.fieldArrayskylight.push(this.skylightsobject);
      this.skylightsobjectlist.push(this.skylightsobject);
      this.skylightsobject = {
        Area: 0,
        ConstructionRValue: null,
        Length: null,
        SkylightsName: null,
        Width: null,
        HeatLoss: 0
      };
    }

  }

  onKeyLengthSkylight(event) {
    if (event.target.value === "") {
      this.skylightsobject.Area = 0;
    } else {
      this.skylightsobject.Length = event.target.value;
      this.skylightsobject.Area = this.skylightsobject.Length * this.skylightsobject.Width;
    }
  }

  onKeyWidthSkylight(event) {
    if (event.target.value === "") {
      this.skylightsobject.Area = 0;
    } else {
      this.skylightsobject.Width = event.target.value;
      this.skylightsobject.Area = this.skylightsobject.Length * this.skylightsobject.Width;
    }
  }

  onKeyLengthSkylightedit(event) {
    if (event.target.value === "") {
      this.skylightsobject1.Area = 0;
    } else {
      this.skylightsobject1.Length = event.target.value;
      this.skylightsobject1.Area = this.skylightsobject1.Length * this.skylightsobject1.Width;
    }
  }

  onKeyWidthSkylightedit(event) {
    if (event.target.value === "") {
      this.skylightsobject1.Area = 0;
    } else {
      this.skylightsobject1.Length = event.target.value;
      this.skylightsobject1.Area = this.skylightsobject1.Length * this.skylightsobject1.Width;
    }
  }
}
