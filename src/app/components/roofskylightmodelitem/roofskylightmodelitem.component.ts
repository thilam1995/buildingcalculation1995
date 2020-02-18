import { Component, OnInit, Input } from '@angular/core';
import { Roof } from 'src/app/models/roof';
import { Skylights } from 'src/app/models/skylights';
import { Roofextend } from 'src/app/models/roofextend';
import { Roofskylightmodel } from 'src/app/models/roofskylightmodel';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { RoofskylightService } from 'src/app/service/roofskylight.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-roofskylightmodelitem',
  templateUrl: './roofskylightmodelitem.component.html',
  styleUrls: ['./roofskylightmodelitem.component.css']
})
export class RoofskylightmodelitemComponent implements OnInit {

  projectid: string = "";
  designid: string = "";

  isedit: boolean = false;
  isdisplay: boolean = false;
  @Input() i: any;
  skylightsobjectlist: Skylights[];
  roofobjectlist: Roof[];
  roofobject: Roof;
  skylightobject: Skylights;
  roofextendobject: Roofextend;

  roofskylightmodel: Roofskylightmodel;
  skylightmodellist = [];
  registeruser: Register;

  skylightwidth = 0;
  skylightlength = 0;
  rvalueskylight = 0;

  constructor(private toastr: ToastrService, public route: ActivatedRoute,
    private loginservice: LoginserviceService, private roofskylightservice: RoofskylightService,
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
    this.setDefault();
    this.fetchingroof();
    this.fetchingskylight();
  }

  fetchingroof() {
    // this.roofskylightservice.rooflistdata(this.designid).subscribe(res => {
    //   this.roofobjectlist = res;
    // }, err => {
    //   this.toastr.error("Something Wrong", "Error Message!");
    // });
    this.roofskylightservice.rooflistdata(this.designid);
  }

  fetchingskylight() {
    // this.roofskylightservice.skylightlistdata(this.designid).subscribe(res => {
    //   this.skylightsobjectlist = res;
    // }, err => {
    //   this.toastr.error("Something Wrong", "Error Message!");
    // });
    this.roofskylightservice.skylightlistdata(this.designid);
  }


  setDefault() {
    this.skylightmodellist = [];
    this.roofobject = {
      RoofName: null,
      ConstructionRValue: null,

    }
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
      UserID: null
    };

  }

  deleteskylight(i: number) {
    if (confirm("Do you want to delete this section") === true) {
      this.skylightmodellist.splice(i, 1);
    }
  }

  onEdit(i: any) {
    this.isedit = true;
    if(this.isdisplay){
      this.isdisplay = false;
    }
    this.roofextendobject = Object.assign({}, i.data.Roof);
    this.roofobject = {
      RoofName: this.roofextendobject.RoofName,
      ConstructionRValue: this.roofextendobject.ConstructionRValue
    }
    console.log(this.roofextendobject);
    this.skylightmodellist = i.data.Skylight;
    console.log(this.skylightmodellist);

    console.log(this.roofobject);
  }

  compareFn(a, b) {
    console.log (JSON.stringify(a) + " " + JSON.stringify(b));
    return a && b && a.RoofName === b.RoofName && a.ConstructionRValue === b.ConstructionRValue;
  }

  optionchange() {
    if (this.skylightobject) {
      this.skylightwidth = this.skylightobject.Width;
      this.skylightlength = this.skylightobject.Length;
      this.rvalueskylight = this.skylightobject.ConstructionRValue;
      this.skylightmodellist.push(this.skylightobject);
      setTimeout(() => {
        this.skylightobject = null;
        this.skylightwidth = 0;
        this.skylightlength = 0;
        this.rvalueskylight = 0;
      }, 200);

    } else if (this.skylightobject === null) {
      this.skylightwidth = 0;
      this.skylightlength = 0;
      this.rvalueskylight = 0;
    }
  }

  onCancel() {
    this.isedit = false;
  }

  onDelete(id: string) {
    if (confirm("Do you want to delete this section") === true) {
      this.buildingmodelservice.roofskylightmodelDelete(id, this.designid).subscribe(res => {
        this.toastr.success("Delete Successfully", "Info");
        this.buildingmodelservice.roofskylightmodelGet(this.designid);
      }, err => {
        this.toastr.error("Delete failed", "Info");
      });
    }
  }

  onUpdate(id: string) {
    this.roofextendobject.RoofName = this.roofobject.RoofName;
    this.roofextendobject.ConstructionRValue = Number(this.roofobject.ConstructionRValue);
    this.roofextendobject.ExposedArea = Number(this.roofextendobject.ExposedArea);
    if (this.roofextendobject.RoofName === null || this.roofextendobject.RoofSection === null || this.roofextendobject.ExposedArea === null) {
      this.toastr.error("Please Complete Roof Information", "Error Message");
    } else {
      this.roofskylightmodel = {
        Roof: this.roofextendobject,
        Skylight: this.skylightmodellist,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };

      console.log(this.roofskylightmodel);
      this.buildingmodelservice.roofskylightmodelUpdate(id, this.roofskylightmodel, this.designid).subscribe(res => {
        this.toastr.success("Insert Roof Successfully", "Info");
        this.setDefault();
        this.buildingmodelservice.roofskylightmodelGet(this.designid);
      }, err => {
        this.toastr.error("Insert Roof and Skylight failed", "Error");
      });
    }
  }
}
