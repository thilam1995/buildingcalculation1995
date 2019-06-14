import { Component, OnInit, Input } from '@angular/core';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'ngx-webstorage';
import { Roofextend } from 'src/app/models/roofextend';

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
  @LocalStorage('roofskylightobjectlist') @Input() roofskylightobjectlist = [];
  fieldarrayskylight: Array<any> = [];
  fieldarrayskylight1: Array<any> = [];
  roofobject: Roof;
  skylightobject: Skylights;
  roofobject1: Roof;
  skylightobject1: Skylights;
  roofextendobject: Roofextend;
  roofextendobject1: Roofextend;
  skylightwidth = 0;
  skylightlength = 0;
  skylightwidth1 = 0;
  skylightlength1 = 0;
  display: boolean = false;
  display1: boolean = false;
  roofname: string = "";
  roofname1: string = "";
  roof_section: string = "";
  roof_section1: string = "";
  roofarea: number = null;
  roofarea1: number = null;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.setDefault();
  }

  setDefault() {
    this.roofobject = {
      Description: null,
      ConstructionRValue: null,
      RoofName: null
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
      ConstructionRValue: null,
      RoofName: null, 
      Description: null
    };
    this.skylightobject1 = {
      Area: 0,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      HeatLoss: 0
    };
    this.roofextendobject = {
      RoofSection: null,
      ConstructionRValue: null,
      RoofName: null, ExposedArea: null
    }

    this.roofextendobject1 = {
      RoofSection: null,
      ConstructionRValue: null,
      RoofName: null, ExposedArea: null
    }
    this.roof_section = "";
  }

  addrooftoggle() {
    this.display = !this.display;
    if(!this.display){
      this.roof_section = null;
      this.roofname = null;
      this.roofextendobject = {
        RoofSection: null,
        ConstructionRValue: null,
        RoofName: null, ExposedArea: null
      };
    }
  }

  addskylighttoggle() {
    this.display1 = !this.display1;
    if(!this.display1){
      this.skylightobject = {
        Area: 0,
        ConstructionRValue: null,
        Length: null,
        SkylightsName: null,
        Width: null,
        HeatLoss: 0
      };
      this.fieldarrayskylight = [];
    }
  }

  addvalueskylight() {
    if (this.skylightobject.Area === null || this.skylightobject.Width === null ||
      this.skylightobject.Length === null) {
      this.toastr.error("Please add something!", "Roof Skylight Model");
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
      this.toastr.error("Please add something!", "Roof Skylight Model");
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
    if (this.roof_section === null || this.roofarea === null) {
      this.toastr.error("Please complete all detail.", "Roof Skylight Model");
    } else {
      this.roofextendobject.RoofSection = this.roof_section;
      this.roofextendobject.ExposedArea = this.roofarea;
      this.roofskylightobject.roof = this.roofextendobject;
      this.roofskylightobject.skylight = this.fieldarrayskylight;
      this.roofskylightobject.buttonshowhide = this.roofskylightobject.isDisplay ? "Hide" : "Show";
      this.roofskylightobjectlist.push(this.roofskylightobject);
      this.roofskylightobjectlist = this.roofskylightobjectlist;
      this.fieldarrayskylight = [];
      this.setDefault();
      this.roofskylightobject = { roof: null, skylight: null, isDisplay: false, buttonshowhide: "Hide" };
      this.skylightwidth = 0;
      this.skylightlength = 0;
      this.display = false;
      this.display1 = false;
      this.roof_section = "";
      this.roofarea = null;
      this.roofname = null;
    }

  }

  optionchange() {
    this.skylightwidth = this.skylightobject.Width;
    this.skylightlength = this.skylightobject.Length;
  }

  optionchange2() {
    this.roofobject1 = this.roofobjectlist.find(x =>
        x.RoofName === this.roofname1
      );
  }

  optionchange3() {
    this.roofobject = this.roofobjectlist.find(x =>
        x.RoofName === this.roofname
      );
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
    this.roofname1 = this.roofskylightobject1.roof.RoofName;
    this.roofobject1 = this.roofobjectlist.find(x => x.RoofName === this.roofname1);
    
    this.roofarea1 = this.roofextendobject1.ExposedArea;
    this.roof_section1 = this.roofextendobject1.RoofSection;
    this.fieldarrayskylight1 = this.roofskylightobject1.skylight;
  }

  onSave(roofskylighti, index: number) {
    roofskylighti.isEditable = !roofskylighti.isEditable;
    this.roofextendobject1.ExposedArea = this.roofarea1;
    this.roofobject1.RoofName = this.roofname1;
    this.roofextendobject1.RoofSection = this.roof_section1;
    this.roofskylightobjectlist[index].roof = this.roofobject1;
    this.roofskylightobjectlist[index].skylight = this.roofskylightobject1.skylight;
    this.roofskylightobjectlist = this.roofskylightobjectlist;
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
      Description: null,
      ConstructionRValue: null,
      RoofName: null
    };
    this.roof_section1 = "";
    this.roofarea1 = null;
    this.roofname1 = null;
  }

  onDelete(index: number) {
    if(confirm("Do you want to delete?") === true){
      this.roofskylightobjectlist.splice(index, 1);
      this.roofskylightobjectlist = this.roofskylightobjectlist;
    }
    
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
      Description: null,
      ConstructionRValue: null,
      RoofName: null
    };
    this.fieldarrayskylight1 = [];
  }

  deleteskylight(index: number) { //Delete window during editing model
    this.roofskylightobject1.skylight.splice(index, 1);
  }
}
