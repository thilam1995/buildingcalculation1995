import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { BsDropdownToggleDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';

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
  @Input() fieldarrayfloor: Array<any> = [];
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
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
      ExposedArea: null
    };
    this.floorobject1 = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
      ExposedArea: null
    };
    this.floorarea = null;
  }

  addfloortoggle() {
    this.display = !this.display;
    if(!this.display){
      this.floorobject = {
        FloorSection: null,
        FloorName: null,
        ConstructionRValue: null,
        Description: null,
        ExposedArea: null
      };
    }
  }

  addFieldValue() {
    if(this.floor_section === null || this.floorarea === null){
      this.toastr.error("Please fill section, construction and area.", "Floor Model")
    }else{
      this.floorobject.FloorName = this.floorname;
      this.floorobject.FloorSection = this.floor_section;
      this.floorobject.ExposedArea = this.floorarea;
      this.floorsobject.floor = this.floorobject;
      this.floorsobject.buttonshowhide = this.floorsobject.isDisplay ? "Hide" : "Show";
      this.fieldarrayfloor.push(this.floorsobject);
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
    this.floor_section1 = this.floorobject1.FloorSection;
    this.floorname1 = this.floorobject1.FloorName;
    this.floorarea1 = this.floorobject1.ExposedArea;
  }

  onSave(floori, index: number){
    floori.isEditable = !floori.isEditable;
    this.floorobject1.FloorName = this.floorname1;
    this.floorobject1.ExposedArea = this.floorarea1;
    this.floorobject1.FloorSection = this.floor_section1;
    this.fieldarrayfloor[index].floor = this.floorobject1;
    console.log(this.fieldarrayfloor[index]);
    this.floor_section1 = "";
    this.floorarea1 = null;
    this.floorobject1 = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
      ExposedArea: null
    };
  }

  onDelete(index: number){
    this.fieldarrayfloor.splice(index, 1);
  }

  onCancel(floori){
    floori.isEditable = !floori.isEditable;
    this.floor_section1 = "";
    this.floorobject1 = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
      ExposedArea: null
    };
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
