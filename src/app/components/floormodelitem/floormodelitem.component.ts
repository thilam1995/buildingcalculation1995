import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { Floormodel } from 'src/app/models/floormodel';
import { Floorextend } from 'src/app/models/floorextend';
import { Register } from 'src/app/models/register';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { FloorService } from 'src/app/service/floor.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';

@Component({
  selector: 'app-floormodelitem',
  templateUrl: './floormodelitem.component.html',
  styleUrls: ['./floormodelitem.component.css']
})
export class FloormodelitemComponent implements OnInit {

  isedit: boolean = false;
  isdisplay: boolean = false;
  @Input() flooritem: any;
  floorobject: Floors;
  floormodel: Floormodel;
  floorextendobject: Floorextend;

  floorobjectlist = [];

  projectid: string = "";
  designid: string = "";
  registeruser: Register;

  constructor(private toastr: ToastrService, public route: ActivatedRoute,
    private loginservice: LoginserviceService, private floorservice: FloorService,
    private buildingmodelservice: BuildingmodelService) {
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    this.loginservice.currentUser.subscribe(x => {
      if (x === null) {
        this.registeruser = loginapp;
      } else {
        this.registeruser = x;
      }

    });
    this.route.queryParams.subscribe(params => {
      this.projectid = params['projectid'];
      this.designid = params['designid'];
    });
  }

  ngOnInit() {
    this.setdefault();
    this.fetchingfloordata();
    //this.fetchingfloormodel();
  }

  fetchingfloormodel(){
    this.buildingmodelservice.floormodelGet(this.designid);
  }

  fetchingfloordata() {
    // this.floorservice.floorlistdata(this.designid).subscribe(res => {
    //   this.floorobjectlist = res;
    // }, err => {
    //   this.toastr.error("Error! Something Wrong.", "Error Message")
    // });
    this.floorservice.floorlistdata(this.designid);
  }

  setdefault() {
    this.floorobject = {
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

    this.floormodel = {
      Floor: null,
      DesignID: null,
      ProjectID: null,
      UserID: null
    };

  }

  onCancel(){
    this.isedit = false;
  }

  selecttoEdit(i: any){
    this.isedit = true;
    if(this.isdisplay){
      this.isdisplay = false;
    }
    this.floorextendobject = Object.assign({}, i.data.Floor);
    this.floorobject = {
      FloorName: this.floorextendobject.FloorName,
      ConstructionRValue: this.floorextendobject.ConstructionRValue
    };
  }

  compareFn(a, b) {
    console.log(JSON.stringify(a) + " " + JSON.stringify(b));
    return a && b && a.FloorName === b.FloorName && a.ConstructionRValue === b.ConstructionRValue;
  }

  onSave(id: string){
    this.floorextendobject.FloorName = this.floorobject.FloorName;
    this.floorextendobject.ConstructionRValue = Number(this.floorobject.ConstructionRValue);
    this.floorextendobject.ExposedArea = Number(this.floorextendobject.ExposedArea);
    if (this.floorextendobject.FloorName === null || this.floorextendobject.ExposedArea === null ||
      this.floorextendobject.FloorSection === null) {
        this.toastr.error("Please Complete Floor Info", "Error");
    } else {
      this.floormodel = {
        Floor: this.floorextendobject,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };

      console.log(this.floormodel)
      this.buildingmodelservice.floormodelUpdate(id, this.floormodel, this.designid).subscribe(res => {
        this.toastr.success("Update Floor Successfully!", "Info");
        this.setdefault();
        this.fetchingfloormodel();
      }, err => {
        this.toastr.error("Update Floor failed!", "Info");
      });
    }
  }

  onDelete(id: string){
    if (confirm("Do you want to delete this section") === true) {
      this.buildingmodelservice.floormodelDelete(id, this.designid).subscribe(res =>{
        this.toastr.success("Delete Successfully", "Info");
        this.fetchingfloormodel();
      }, err =>{
        this.toastr.error("Delete failed", "Info");
      });
    }
  }

}
