import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { BsDropdownToggleDirective } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'ngx-webstorage';
import { Floorextend } from 'src/app/models/floorextend';
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { FloorService } from 'src/app/service/floor.service';
import { Floormodel } from 'src/app/models/floormodel';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';

@Component({
  selector: 'app-floormodel',
  templateUrl: './floormodel.component.html',
  styleUrls: ['./floormodel.component.css']
})
export class FloormodelComponent implements OnInit {

  @Input() floorobjectlist: Floors[];
  @Input() floorsobject = { floor: null };
  floorobject: Floors;
  floormodel: Floormodel;

  floorextendobject: Floorextend;

  @Input() floormodelobjectlist = [];
  display: boolean = false;


  projectid: string = "";
  designid: string = "";
  registeruser: Register;

  constructor(private toastr: ToastrService, public route: ActivatedRoute,
    private loginservice: LoginserviceService, public floorservice: FloorService,
    public buildingmodelservice: BuildingmodelService) {
    //this.setDefault();
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
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
    this.fetchingfloormodel();
  }


  fetchingfloordata() {
    // this.floorservice.floorlistdata(this.designid).subscribe(res => {
    //   this.floorobjectlist = res;
    // }, err => {
    //   this.toastr.error("Error! Something Wrong.", "Error Message")
    // });
    this.floorservice.floorlistdata(this.designid);
  }

  fetchingfloormodel(){
    this.buildingmodelservice.floormodelGet(this.designid);
  }

  setdefault() {
    this.floorobject = null;

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
      UserID: null,
      DateCreated: null
    };

  }

  addfloortoggle() {
    this.display = !this.display;
    if (!this.display) {
      this.floorextendobject = {
        FloorSection: null,
        FloorName: null,
        ConstructionRValue: null,
        ExposedArea: null
      };
    }
  }

  addFieldValue() {
    if(this.floorobject === null){
      this.toastr.error("Please Complete Floor Info", "Error");
    }else{
      this.floorextendobject.FloorName = this.floorobject.FloorName;
      this.floorextendobject.ConstructionRValue = Number(this.floorobject.ConstructionRValue);
      this.floorextendobject.ExposedArea = Number(this.floorextendobject.ExposedArea);
      if (this.floorextendobject.FloorName === null || this.floorextendobject.ExposedArea === null ||
        this.floorextendobject.FloorSection === null) {
          this.toastr.error("Please Complete Floor Info", "Error");
      } else {
        let date = new Date();
        this.floormodel = {
          Floor: this.floorextendobject,
          DesignID: this.designid,
          ProjectID: this.projectid,
          UserID: this.registeruser.ID,
          DateCreated: date.toString()
        };
  
        console.log(this.floormodel)
        this.buildingmodelservice.floormodelPost(this.floormodel, this.designid).subscribe(res => {
          this.toastr.success("Floor Model Successfully Add!", "Info");
          this.setdefault();
          this.display = false;
          this.fetchingfloormodel();
        }, err => {
          this.toastr.error("Floor model failed to add!", "Info");
        });
      }
    }

  }

  setDefault(){
    this.registeruser = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }


}
