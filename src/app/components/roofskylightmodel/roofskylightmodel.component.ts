import { Component, OnInit, Input } from '@angular/core';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';

@Component({
  selector: 'app-roofskylightmodel',
  templateUrl: './roofskylightmodel.component.html',
  styleUrls: ['./roofskylightmodel.component.css']
})
export class RoofskylightmodelComponent implements OnInit {

  @Input() skylightsobjectlist: Skylights[];
  @Input() roofobjectlist: Roof[];
  @Input() roofskylightobject = { roof: null, skylight: null, isDisplay: false, buttonshowhide: "Hide" };
  roofskylightobject1 = { roof: null, skylight: [] };
  @Input() roofskylightobjectlist = [];
  fieldarrayskylight: Array<any> = [];
  fieldarrayskylight1: Array<any> = [];
  roofobject: Roof;
  skylightobject: Skylights;
  roofobject1: Roof;
  skylightobject1: Skylights;
  skylightwidth = 0;
  skylightlength = 0;
  skylightwidth1 = 0;
  skylightlength1 = 0;
  display: boolean = false;
  roof_section: string = "";
  roof_section1: string = "";
  roofarea: number = null;
  roofarea1: number = null;

  constructor() { }

  ngOnInit() {
    this.setDefault();
  }

  setDefault() {
    this.roofobject = {
      RoofSection: null,
      Description: null,
      ConstructionRValue: null,
      RoofName: null, ExposedArea: null
    };
    this.skylightobject = {
      Area: 0,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      HeatLoss: 0
    };
    this.roofobject1 = {
      RoofSection: null,
      Description: null,
      ConstructionRValue: null,
      RoofName: null, ExposedArea: null
    };
    this.skylightobject1 = {
      Area: 0,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      HeatLoss: 0
    };
    this.roof_section = "";
  }

  addrooftoggle() {
    this.display = !this.display;
    console.log(this.roofskylightobjectlist.length);
  }

  addvalueskylight() {
    if (this.skylightobject.Area === null || this.skylightobject.Width === null ||
      this.skylightobject.Length === null) {
      alert("Please add something!");
    } else {
      this.fieldarrayskylight.push(this.skylightobject);
      this.skylightobject = {
        Area: 0,
        ConstructionRValue: null,
        Length: null,
        SkylightsName: null,
        Width: null,
        HeatLoss: 0
      };
      this.skylightwidth = 0;
      this.skylightlength = 0;
    }

  }

  addvalueskylight1() {
    if (this.skylightobject1.Area === null || this.skylightobject1.Width === null ||
      this.skylightobject1.Length === null) {
      alert("Please add something!");
    } else {
      this.roofskylightobject1.skylight.push(this.skylightobject1);
      this.skylightobject1 = {
        Area: 0,
        ConstructionRValue: null,
        Length: null,
        SkylightsName: null,
        Width: null,
        HeatLoss: 0
      };
      this.skylightwidth1 = 0;
      this.skylightlength1 = 0;
    }

  }

  addFieldValue() {
    if(this.roof_section === null || this.roofobject.ExposedArea === null ||
      this.roofskylightobject.skylight === null){
      alert("Please complete all detail.");
    }else{
      this.roofobject.RoofSection = this.roof_section;
      this.roofobject.ExposedArea = this.roofarea;
      this.roofskylightobject.roof = this.roofobject;
      this.roofskylightobject.skylight = this.fieldarrayskylight;
      this.roofskylightobject.buttonshowhide = this.roofskylightobject.isDisplay ? "Hide" : "Show";
      this.roofskylightobjectlist.push(this.roofskylightobject);
      this.fieldarrayskylight = [];
      this.setDefault();
      this.roofskylightobject = { roof: null, skylight: null, isDisplay: false, buttonshowhide: "Hide" };
      this.skylightwidth = 0;
      this.skylightlength = 0;
      this.display = !this.display;
      this.roof_section = "";
      this.roofarea = null;
    }

  }

  optionchange() {
    this.skylightwidth = this.skylightobject.Width;
    this.skylightlength = this.skylightobject.Length;
  }

  optionchange2(roofobject) {
    if (roofobject.ConstructionRValue !== null) {
      this.roofobject.ConstructionRValue = Number.parseFloat(roofobject.ConstructionRValue);
    }
  }

  deleteFieldValueSkylight(index: number) {
    this.fieldarrayskylight.splice(index, 1);
  }

  hideorshow(roofskylighti) {
    roofskylighti.isDisplay = !roofskylighti.isDisplay;
    roofskylighti.buttonshowhide = roofskylighti.isDisplay ? "Hide" : "Show";
  }

  toggle(roofskylighti) {
    roofskylighti.isDisplay1 = !roofskylighti.isDisplay1;
  }

  onEdit(roofskylighti, index: number) {
    roofskylighti.isEditable = !roofskylighti.isEditable;
    this.roofskylightobject1 = this.roofskylightobjectlist[index];
    this.roofobject1 = this.roofskylightobject1.roof;
    this.roofarea1 = this.roofobject1.ExposedArea;
    this.roof_section1 = this.roofobject1.RoofSection;
    this.fieldarrayskylight1 = this.roofskylightobject1.skylight;
  }

  onSave(roofskylighti, index: number) {
    roofskylighti.isEditable = !roofskylighti.isEditable;
    this.roofobject1.ExposedArea = this.roofarea1;
    this.roofobject1.RoofSection = this.roof_section1;
    this.roofskylightobjectlist[index].roof = this.roofobject1;
    this.roofskylightobjectlist[index].skylight = this.roofskylightobject1.skylight;
    this.roofskylightobject1 = {
      roof: null,
      skylight: null
    }
    this.skylightobject1 = {
      Area: 0,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      HeatLoss: 0
    };
    this.roofobject1 = {
      RoofSection: null,
      Description: null,
      ConstructionRValue: null,
      RoofName: null, ExposedArea: null
    };
    this.roof_section1 = "";
    this.roofarea1 = null;
  }

  onDelete(index: number) {
    this.roofskylightobjectlist.splice(index, 1);
  }

  onCancel(roofskylighti) {
    roofskylighti.isEditable = !roofskylighti.isEditable;
    this.roofskylightobject1 = {
      roof: null,
      skylight: null
    }
    this.skylightobject1 = {
      Area: 0,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      HeatLoss: 0
    };
    this.roofobject1 = {
      RoofSection: null,
      Description: null,
      ConstructionRValue: null,
      RoofName: null, ExposedArea: null
    };
    this.fieldarrayskylight1 = [];
  }

  deleteskylight(index: number) { //Delete window during editing model
    this.roofskylightobject1.skylight.splice(index, 1);
  }
}
