import { Component, OnInit } from '@angular/core';
import { Skylights } from 'src/app/models/skylights';
import { Register } from 'src/app/models/register';
import { RoofskylightService } from 'src/app/service/roofskylight.service';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ToastrService } from 'ngx-toastr';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-skylightform',
  templateUrl: './skylightform.component.html',
  styleUrls: ['./skylightform.component.css']
})
export class SkylightformComponent implements OnInit {

  skylightsobject: Skylights;
  designid: string = "";
  projectid: string = "";
  registeruser: Register;
  constructor(public roofskylightservice: RoofskylightService, public route: ActivatedRoute, private loginservice: LoginserviceService,
    private toastr: ToastrService, private buildingmodelservice: BuildingmodelService) {
    this.route.queryParams.subscribe(params => {
      this.projectid = params['projectid'];
      this.designid = params['designid'];
    });
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    this.loginservice.currentUser.subscribe(x => {
      if (x === null) {
        this.registeruser = loginapp;
      } else {
        this.registeruser = x;
      }

    });
    this.setDefaultSkylight();
  }

  ngOnInit() {
    this.fetchingskylight();
  }

  fetchingskylight() {

    this.roofskylightservice.skylightlistdata(this.designid);
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
      UserID: null,
      DateCreated: null
    };
  }

  onSubmitSkylight(form: NgForm) {
    if (form.value.id === null) {
      let date = new Date();
      this.skylightsobject = {
        Area: this.skylightsobject.Area,
        ConstructionRValue: form.value.constructionrvalue,
        Length: form.value.length,
        SkylightsName: form.value.skylightname,
        Width: form.value.width,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID,
        DateCreated: date.toString()
      };

      const found = this.roofskylightservice.skylightlist.some(x => {
        return x.data.SkylightsName === this.skylightsobject.SkylightsName
      }); //This boolean will detect if the name is existed to prevent duplicate with different value

      if(!found){
        this.roofskylightservice.addskylight(this.skylightsobject).subscribe(res => {
          this.toastr.success("Add skylight!", "Info Message!");
          
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
        this.toastr.success("Add skylight!", "Info Message!");
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
          this.toastr.success("Deleted skylight!", "Info Message!");
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

  updateskylightmodel(id: string, skylight: Skylights){
    this.buildingmodelservice.fetchroofskylightmodelGet(this.designid);
    if(this.buildingmodelservice.roofskylightmodellist.length !== 0){
      for(let i of this.buildingmodelservice.roofskylightmodellist){
        let skylightmodellist:Array<any> = i.data.Skylight;
        const found = skylightmodellist.some(x => {
          return x.SkylightsName === skylight.SkylightsName
        }); //This boolean will detect if the name is existed to prevent duplicate with different value
        if(found){
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
      }
    }else{
      this.setDefaultSkylight();
    }
  }

  deleteskylightmodel(id: string, roofi: any){
    this.buildingmodelservice.fetchroofskylightmodelGet(id);
    if(this.buildingmodelservice.wallwindowdoormodellist.length !== 0){
      for(let i of this.buildingmodelservice.wallwindowdoormodellist){
        let skylightmodellist:Array<any> = i.data.Skylight;
        const found = skylightmodellist.some(x => {
          return x.SkylightsName === roofi.SkylightsName
        }); //This boolean will detect if the name is existed to prevent duplicate with different value
        if(found){
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
