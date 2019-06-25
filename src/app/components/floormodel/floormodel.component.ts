import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { BsDropdownToggleDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'ngx-webstorage';
import { Floorextend } from 'src/app/models/floorextend';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-floormodel',
  templateUrl: './floormodel.component.html',
  styleUrls: ['./floormodel.component.css']
})
export class FloormodelComponent implements OnInit {

  @Input() floorobjectlist: Floors[];
  @Input() floorsobject = { floor: null, isDisplay: false, buttonshowhide: "Hide" };
  floorobject: Floors;
  floorobject1: Floors;
  floorextendobject: Floorextend;
  floorextendobject1: Floorextend;
  @LocalStorage('fieldarrayfloor') @Input() fieldarrayfloor: Array<any> = [];
  display: boolean = false;
  floor_section: string = "";
  floor_section1: string = "";
  floorname: string = "";
  floorname1: string = ""
  floorarea: number = null;
  floorarea1: number = null;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.setdefault();
  }

  setdefault() {
    this.floorobject = {
      FloorName: null,
      ConstructionRValue: null,
      Description: null
    };
    this.floorobject1 = {
      FloorName: null,
      ConstructionRValue: null,
      Description: null
    };
    this.floorextendobject = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      ExposedArea: null
    };

    this.floorextendobject1 = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      ExposedArea: null
    };

    this.floorarea = null;
  }

  addfloortoggle() {
    this.display = !this.display;
    if(!this.display){
      this.floorextendobject = {
        FloorSection: null,
        FloorName: null,
        ConstructionRValue: null,
        ExposedArea: null
      };
    }
  }

  addFieldValue() {
    if(this.floor_section === null || this.floorarea === null){
      this.toastr.error("Please fill section, construction and area.", "Floor Model")
    }else{

      this.floorextendobject = {
        FloorSection: this.floor_section,
        FloorName: this.floorname,
        ConstructionRValue: this.floorobject.ConstructionRValue,
        ExposedArea: this.floorarea
      }
      this.floorsobject = {
        floor: this.floorextendobject,
        isDisplay: false,
        buttonshowhide: "Hide"
      }
      this.fieldarrayfloor.push(this.floorsobject);
      this.fieldarrayfloor = this.fieldarrayfloor;
      this.setdefault();
      this.floorsobject = { floor: null, isDisplay: false, buttonshowhide: "Hide" };
      this.display = !this.display;
      this.floor_section = null;
      this.floorname = null;
    }
  }

  hideorshow(floori){
    floori.isDisplay = !floori.isDisplay;
    floori.buttonshowhide = floori.isDisplay ? "Hide" : "Show";
  }

  toggle(floori) {
    floori.isDisplay = !floori.isDisplay;
  }

  onEdit(floori, index: number){
    floori.isEditable = !floori.isEditable;
    this.floorobject1 = this.fieldarrayfloor[index].floor;
    this.floor_section1 = this.floorextendobject1.FloorSection;
    this.floorname1 = this.floorextendobject1.FloorName;
    this.floorobject1 = this.floorobjectlist.find(x =>
      x.FloorName === this.floorname1
    );
    this.floorarea1 = this.floorextendobject1.ExposedArea;
  }

  onSave(floori, index: number){
    floori.isEditable = !floori.isEditable;
    //this.floorobject1.FloorName = this.floorname1;
    this.floorextendobject1 = {
      FloorSection: this.floor_section1,
      FloorName: this.floorname1,
      ConstructionRValue: this.floorobject1.ConstructionRValue,
      ExposedArea: this.floorarea1
    }
    // this.floorextendobject1.ExposedArea = this.floorarea1;
    // this.floorextendobject1.FloorSection = this.floor_section1;
    this.fieldarrayfloor[index].floor = this.floorextendobject1;
    this.fieldarrayfloor = this.fieldarrayfloor;
    console.log(this.fieldarrayfloor[index]);
    this.floor_section1 = "";
    this.floorarea1 = null;
    this.floorobject1 = {
      FloorName: null,
      ConstructionRValue: null,
      Description: null
    };
  }

  onDelete(index: number){
    if(confirm('Do you want to delete this?')=== true){
      this.fieldarrayfloor.splice(index, 1);
      this.fieldarrayfloor = this.fieldarrayfloor;
    }
    
  }

  onCancel(floori){
    floori.isEditable = !floori.isEditable;
    this.floor_section1 = "";
    this.floorextendobject1 = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      ExposedArea: null
    };
    this.floorobject1 = {
      FloorName: null,
      ConstructionRValue: null,
      Description: null
    }
    this.floorname1 = "";
    this.floorarea1 = null;
  }

  floorchange(){
    this.floorobject = this.floorobjectlist.find(x =>
      x.FloorName === this.floorname
    );
  }

  optionchange1(){
    this.floorobject1 = this.floorobjectlist.find(x =>
      x.FloorName === this.floorname1
    );
  }
}
