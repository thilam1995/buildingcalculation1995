import { Component, OnInit, Input } from '@angular/core';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'ngx-webstorage';
import { Roofextend } from 'src/app/models/roofextend';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { RoofskylightService } from 'src/app/service/roofskylight.service';
import { Roofskylightmodel } from 'src/app/models/roofskylightmodel';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';

@Component({
  selector: 'app-roofskylightmodel',
  templateUrl: './roofskylightmodel.component.html',
  styleUrls: ['./roofskylightmodel.component.css']
})
export class RoofskylightmodelComponent implements OnInit {

  @Input() skylightsobjectlist: Skylights[];
  @Input() roofobjectlist: Roof[];
  @Input() roofskylightobject = { roof: null, skylight: []};
  @Input() roofskylightobjectlist = [];

  projectid: string = "";
  designid: string = "";

  roofobject: Roof;
  skylightobject: Skylights;
  roofextendobject: Roofextend;

  roofskylightmodel: Roofskylightmodel;

  skylightwidth = 0;
  skylightlength = 0;
  rvalueskylight = 0;

  display: boolean = false;
  display1: boolean = false;
  skylightmodellist = [];

  registeruser: Register;

  constructor(private toastr: ToastrService, public route: ActivatedRoute,
    private loginservice: LoginserviceService, private roofskylightservice: RoofskylightService,
    private buildingmodelservice: BuildingmodelService) { 
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
    this.setDefault();
    this.fetchingroof();
    this.fetchingskylight();
    this.fetchingroofskylightmodel();
  }

  refreshingalldata(){
    this.fetchingroof();
    this.fetchingskylight();
  }

  fetchingroof(){
    // this.roofskylightservice.rooflistdata(this.designid).subscribe(res => {
    //   this.roofobjectlist = res;
    // }, err => {
    //   this.toastr.error("Something Wrong", "Error Message!");
    // });

    this.roofskylightservice.rooflistdata(this.designid);
  }

  fetchingskylight(){
    // this.roofskylightservice.skylightlistdata(this.designid).subscribe(res => {
    //   this.skylightsobjectlist = res;
    // }, err => {
    //   this.toastr.error("Something Wrong", "Error Message!");
    // });
    this.roofskylightservice.skylightlistdata(this.designid)
  }

  fetchingroofskylightmodel(){
    this.buildingmodelservice.roofskylightmodelGet(this.designid);
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
      Width: null
    };

    this.roofextendobject = {
      RoofSection: null,
      ConstructionRValue: null,
      RoofName: null, 
      ExposedArea: null
    };

    this.roofskylightmodel = {
      Roof: null,
      Skylight: null,
      DesignID: null,
      ProjectID: null,
      UserID: null,
    };

  }

  addrooftoggle() {
    this.display = !this.display;
    if(!this.display){
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
      };
    }
  }

  addvalueskylight() {
    if(this.skylightobject){
      this.skylightobject.Length = Number(this.skylightobject.Length);
      this.skylightobject.Width = Number(this.skylightobject.Width);
      this.skylightobject.ConstructionRValue = Number(this.skylightobject.ConstructionRValue);
      this.skylightmodellist.push(this.skylightobject);
      this.skylightobject = {
        Area: 0,
        ConstructionRValue: null,
        Length: null,
        SkylightsName: null,
        Width: null
      };
      this.rvalueskylight = 0;
      this.skylightwidth = 0;
      this.skylightlength = 0;
    }

  }


  optionchange() {
    this.skylightwidth = this.skylightobject.Width;
    this.skylightlength = this.skylightobject.Length;
    this.rvalueskylight = this.skylightobject.ConstructionRValue;
  }

  optionchange3(){
    console.log(this.roofobject);
  }

  addFieldValue(){
    
    this.roofextendobject.RoofName = this.roofobject.RoofName;
    this.roofextendobject.ConstructionRValue = Number(this.roofobject.ConstructionRValue);
    this.roofextendobject.ExposedArea = Number(this.roofextendobject.ExposedArea);
    if(this.roofextendobject.RoofName === null || this.roofextendobject.RoofSection === null || this.roofextendobject.ExposedArea === null){
      this.toastr.error("Please Complete Roof Information", "Error Message");
    }else{
      this.roofskylightmodel = {
        Roof: this.roofextendobject,
        Skylight: this.skylightmodellist,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
  
      console.log(this.roofskylightmodel);
      this.buildingmodelservice.roofskylightmodelPost(this.roofskylightmodel, this.designid).subscribe(res => {
        this.toastr.success("Insert Roof Successfully", "Info");
        this.setDefault();
        this.display = false;
        this.display1 = false;
        this.fetchingroofskylightmodel();
      }, err => {
        this.toastr.error("Insert Roof and Skylight failed", "Error");
      });
    }

  }


  deleteFieldValueSkylight(index: number) {
    if (confirm("Do you want to delete this section") === true) {
      this.skylightmodellist.splice(index, 1);
    }
  }


}
