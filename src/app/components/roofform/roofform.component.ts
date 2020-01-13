import { Component, OnInit } from '@angular/core';
import { Roof } from 'src/app/models/roof';
import { Register } from 'src/app/models/register';
import { RoofskylightService } from 'src/app/service/roofskylight.service';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ToastrService } from 'ngx-toastr';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-roofform',
  templateUrl: './roofform.component.html',
  styleUrls: ['./roofform.component.css']
})
export class RoofformComponent implements OnInit {

  roofobject: Roof;

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
      if (x === null) {
        this.registeruser = loginapp;
      } else {
        this.registeruser = x;
      }

    });
    this.setDefaultRoof();
  }

  ngOnInit() {
    this.fetchingroof();
  }

  fetchingroof() {

    this.roofskylightservice.rooflistdata(this.designid);

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

  onSubmitRoof(form: NgForm) {
    if (form.value.id === null) {
      this.roofobject = {
        Description: form.value.description,
        ConstructionRValue: Number(form.value.constructionrvalue),
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
          this.toastr.success("Added roof!", "Info Message!");
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
        ConstructionRValue: Number(form.value.constructionrvalue),
        RoofName: form.value.roofname,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
      this.roofskylightservice.updateroof(this.roofobject).subscribe(res => {
        this.toastr.success("Updated Roof!", "Success Message!");
        this.updateroofmodel(this.designid, this.roofobject);
        setTimeout(() => {
          this.fetchingroof();
          form.reset();
        }, 1500);
      }, err => {
        this.toastr.error("Something wrong!", "Error Message!");
      });
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
}
