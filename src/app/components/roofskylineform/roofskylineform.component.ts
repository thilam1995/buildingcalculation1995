import { Component, OnInit, Input } from '@angular/core';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';
import { LocalStorage } from 'ngx-webstorage';
import { Register } from 'src/app/models/register';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { RoofskylightService } from 'src/app/service/roofskylight.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';

@Component({
  selector: 'app-roofskylineform',
  templateUrl: './roofskylineform.component.html',
  styleUrls: ['./roofskylineform.component.css']
})
export class RoofskylineformComponent implements OnInit {

  skylightsobject: Skylights;
  roofobject: Roof;

  @Input() skylightsobjectlist = [];
  @Input() roofobjectlist = [];
  designid: string = "";
  projectid: string = "";
  registeruser: Register;

  constructor(private roofskylightservice: RoofskylightService, public route: ActivatedRoute, private loginservice: LoginserviceService,
    private toastr: ToastrService, private buildingmodelservice: BuildingmodelService) {
    this.route.queryParams.subscribe(params => {
      this.projectid = params['projectid'];
      this.designid = params['designid'];
    });
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
          this.registeruser = x;
        }
        
      });
    this.setDefaultRoof();
    this.setDefaultSkylight();
  }

  ngOnInit() {
    this.fetchingroof();
    this.fetchingskylight();
  }

  fetchingroof(){

    this.roofskylightservice.rooflistdata(this.designid);
    
  }

  fetchingskylight(){

    this.roofskylightservice.skylightlistdata(this.designid);
  }

  setDefaultRoof() {
    this.roofobject = {
      Description: null,
      ConstructionRValue: null,
      RoofName: null,
      DesignID: null,
      ID: null,
      ProjectID: null,
      UserID: null
    };
  }

  setDefaultSkylight() {
    this.skylightsobject = {
      Area: null,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      DesignID: null,
      ID: null,
      ProjectID: null,
      UserID: null
    };
  }

  onSubmitRoof(form: NgForm) {
    if (form.value.id === null) {
      this.roofobject = {
        Description: form.value.description,
        ConstructionRValue: form.value.constructionrvalue,
        RoofName: form.value.roofname,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };

      const found = this.roofskylightservice.rooflist.some(x => {
        return x.data.RoofName === this.roofobject.RoofName
      }); //This boolean will detect if the wall name is existed to prevent duplicate with different value

      if(!found){
        this.roofskylightservice.addroof(this.roofobject).subscribe(res => {
          this.toastr.success("Added roof!", "Error Message!");
          setTimeout(() => {
            this.fetchingroof();
          }, 1500);
          
          this.setDefaultRoof();
        }, err => {
          this.toastr.error("Something wrong!", "Error Message!");
        });
      }else{
        this.toastr.warning("The roof name is existed.", "No Duplicate Name");
        form.reset();
      }


    } else {
      this.roofobject = {
        ID: form.value.id,
        Description: form.value.description,
        ConstructionRValue: form.value.constructionrvalue,
        RoofName: form.value.roofname,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
      this.roofskylightservice.updateroof(this.roofobject).subscribe(res => {
        this.toastr.success("Updated skylight!", "Error Message!");
        this.updateroofmodel(this.designid, this.roofobject);
        setTimeout(() => {
          this.fetchingroof();
        }, 1500);
      }, err => {
        this.toastr.error("Something wrong!", "Error Message!");
      });
    }
  }

  onSubmitSkylight(form: NgForm) {
    if (form.value.id === null) {
      this.skylightsobject = {
        Area: this.skylightsobject.Area,
        ConstructionRValue: form.value.constructionrvalue,
        Length: form.value.length,
        SkylightsName: form.value.skylightname,
        Width: form.value.width,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };

      const found = this.roofskylightservice.skylightlist.some(x => {
        return x.data.SkylightsName === this.skylightsobject.SkylightsName
      }); //This boolean will detect if the name is existed to prevent duplicate with different value

      if(!found){
        this.roofskylightservice.addskylight(this.skylightsobject).subscribe(res => {
          this.toastr.success("Add skylight!", "Error Message!");
          
          setTimeout(() => {
            this.fetchingskylight();
          }, 1500);
          
          this.setDefaultSkylight();
        }, err => {
          this.toastr.error("Something wrong!", "Error Message!");
        });
      }else{
        this.toastr.warning("The skylight name is existed.", "No Duplicate Name");
        form.reset();
      }

    } else {
      this.skylightsobject = {
        Area: this.skylightsobject.Area,
        ConstructionRValue: form.value.constructionrvalue,
        Length: form.value.length,
        SkylightsName: form.value.skylightname,
        Width: form.value.width,
        DesignID: this.designid,
        ID: form.value.id,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
      this.roofskylightservice.updateskylight(this.skylightsobject, this.designid).subscribe(res => {
        this.toastr.success("Add skylight!", "Error Message!");
        this.updateskylightmodel(this.designid, this.skylightsobject);
        setTimeout(() => {
          this.fetchingskylight();
        }, 1500);
        this.setDefaultSkylight();
      }, err => {
        this.toastr.error("Something wrong!", "Error Message!");
      })
    }
  }

  editFieldValueRoof(roof: any) {
    let roof1: Roof = {
      ID: roof.id,
      RoofName: roof.data.RoofName,
      ConstructionRValue: roof.data.ConstructionRValue,
      Description: roof.data.Description,
      DesignID: roof.data.DesignID,
      ProjectID: roof.data.ProjectID,
      UserID: roof.data.UserID
    };
    this.roofobject = Object.assign({}, roof1);
  }

  deleteFieldValueRoof(id: string, roofi: any) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.roofskylightservice.deleteroof(id).subscribe(
        res => {
          this.toastr.success("Deleted roof!", "Info Message!");
          this.deleteroofmodel(this.designid, roofi);
          setTimeout(() => {
            this.fetchingroof();
          }, 1500);
        }, err => {
          this.toastr.error("Something wrong!", "Error Message!");
        }
      );
    }
  }



  editFieldValueSkylight(skylight: any) {
    let skylight1: Skylights = {
      ID: skylight.id,
      SkylightsName: skylight.data.SkylightsName,
      ConstructionRValue: skylight.data.ConstructionRValue,
      Length: skylight.data.Length,
      Width: skylight.data.Width,
      Area: skylight.data.Area,
      DesignID: skylight.data.DesignID,
      ProjectID: skylight.data.ProjectID,
      UserID: skylight.data.UserID
    };
    this.skylightsobject = Object.assign({}, skylight1);
  }



  deleteFieldValueSkylight(id: string, skylight: any) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.roofskylightservice.deleteskylight(id).subscribe(
        res => {
          this.toastr.success("Deleted skylight!", "Error Message!");
          this.deleteskylightmodel(this.designid, skylight);
          setTimeout(() => {
            this.fetchingskylight();
          }, 1500);
        }, err => {
          this.toastr.error("Something wrong!", "Error Message!");
        }
      );
    }
  }

  updateroofmodel(id: string, roof: Roof){
    this.buildingmodelservice.fetchroofskylightmodelGet(id);
    console.log(this.buildingmodelservice.roofskylightmodellist);
    if(this.buildingmodelservice.roofskylightmodellist.length !== 0){
      for(let i of this.buildingmodelservice.roofskylightmodellist){
        if(i.data.Roof.RoofName === roof.RoofName){
          if(i.data.Roof.ConstructionRValue !== roof.ConstructionRValue){
            i.data.Roof.ConstructionRValue = roof.ConstructionRValue;
            this.buildingmodelservice.roofskylightmodelUpdate(i.id, i.data, this.designid).subscribe(res => {
              this.toastr.success("Update model successfully", "Info Message");
              this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
            }, err => {
              this.toastr.error("Update model failed", "Info Message");
            });
          }
        }
      }
    }
  }

  deleteroofmodel(id: string, roofi: any){
    this.buildingmodelservice.fetchroofskylightmodelGet(id);
    if(this.buildingmodelservice.wallwindowdoormodellist.length !== 0){
      for(let i of this.buildingmodelservice.wallwindowdoormodellist){
        if(i.data.Roof.RoofName === roofi.Roof.RoofName){
          i.data.Roof = {};
          this.buildingmodelservice.roofskylightmodelUpdate(i.id, i.data, this.designid).subscribe(res => {
            this.toastr.success("Update model successfully", "Info Message");

            this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
          }, err => {
            this.toastr.error("Update model failed", "Info Message");
          });
        }
      }
    }
  }

  updateskylightmodel(id: string, skylight: Skylights){
    this.buildingmodelservice.fetchroofskylightmodelGet(this.designid);
    if(this.buildingmodelservice.wallwindowdoormodellist.length !== 0){
      for(let i of this.buildingmodelservice.wallwindowdoormodellist){
        let skylightmodellist:Array<any> = i.data.Skylight;
        let skylightmodel1:Array<any> = skylightmodellist.filter((x) => x.SkylightsName === skylight.SkylightsName);
        let skylightmodel2:Array<any> = skylightmodellist.filter((x) => x.SkylightsName !== skylight.SkylightsName)
        skylightmodellist.forEach((element, index) => {
          if(element.SkylightsName === skylight.SkylightsName){
              element.ConstructionRValue = skylight.SkylightsName;
              element.Width = skylight.Width;
              element.Length = skylight.Length;
              element.Area = skylight.Area;
          }
        });
        i.data.Skylight = skylightmodellist;
        this.buildingmodelservice.roofskylightmodelUpdate(i.id, i.data, this.designid).subscribe(res => {
          this.toastr.success("Update model successfully", "Info Message");

          this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
        }, err => {
          this.toastr.error("Update model failed", "Info Message");
        });
      }
    }else{
      this.setDefaultRoof();
    }
  }

  deleteskylightmodel(id: string, roofi: any){
    this.buildingmodelservice.fetchroofskylightmodelGet(id);
    if(this.buildingmodelservice.wallwindowdoormodellist.length !== 0){
      for(let i of this.buildingmodelservice.wallwindowdoormodellist){
        let skylightmodellist:Array<any> = i.data.Skylight;
        i.data.Skylight = skylightmodellist.filter(x => x.SkylightsName !== roofi.SkylightsName);
        this.buildingmodelservice.roofskylightmodelUpdate(i.id, i.data, this.designid).subscribe(res => {
          this.toastr.success("Update model successfully", "Info Message");

          this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
        }, err => {
          this.toastr.error("Update model failed", "Info Message");
        });
      }
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


}
