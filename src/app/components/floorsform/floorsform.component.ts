import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { LocalStorage } from 'ngx-webstorage';
import { Register } from 'src/app/models/register';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ToastrService } from 'ngx-toastr';
import { FloorService } from 'src/app/service/floor.service';
import { NgForm } from '@angular/forms';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';

@Component({
  selector: 'app-floorsform',
  templateUrl: './floorsform.component.html',
  styleUrls: ['./floorsform.component.css']
})
export class FloorsformComponent implements OnInit {

  @Input() floorobject: Floors;

  @Input() floorobjectlist = [];

  designid: string = "";
  projectid: string = "";
  registeruser: Register;

  constructor(public route: ActivatedRoute, private loginservice: LoginserviceService,
    private toastr: ToastrService, public floorservice: FloorService, private buildingmodelservice: BuildingmodelService) {
      this.route.queryParams.subscribe(params => {
        this.projectid = params['projectid'];
        this.designid = params['designid'];
      });
      //this.setdefault();
      let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
          this.registeruser = x;
        }
        
      });
      this.setDefault();
  }

  setDefault(){
    this.floorobject = {
      ID: null,
      ConstructionRValue: null,
      Description: null,
      DesignID: null,
      FloorName: null,
      ProjectID: null,
      UserID: null,
      DateCreated: null
    };
  }

  ngOnInit() {
    this.fetchingfloordata();
  }

  fetchingfloordata(){
    this.floorservice.floorlistdata(this.designid);
  }

  onSubmit(form: NgForm) {
    if(form.value.id === null){
      let date = new Date();
      this.floorobject = {
        FloorName: form.value.floorname,
        ConstructionRValue: Number(form.value.constructionrvalue),
        Description: form.value.description,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID,
        DateCreated: date.toString()
      };
      const found = this.floorservice.floorlist.some(x => {
        return x.data.SkylightsName === this.floorobject.FloorName
      }); //This boolean will detect if the name is existed to prevent duplicate with different value

      if(!found){
        this.floorservice.addfloor(this.floorobject).subscribe(res => {
          this.toastr.success("Floor Has Been Added Successfully!", "Info Message");
          setTimeout(() => {
            this.fetchingfloordata();
          }, 1500);
          this.setDefault();
        }, err => {
          this.toastr.error("Floor Has Been failed To Add!", "Info Message");
        });
      }else{
        this.toastr.warning("The floor name is existed.", "No Duplicate Name");
        form.reset();
      }


    }else{
      this.floorobject = {
        ID: form.value.id,
        FloorName: form.value.floorname,
        ConstructionRValue: Number(form.value.constructionrvalue),
        Description: form.value.description,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
      this.floorservice.updatefloor(this.floorobject).subscribe(res => {
        this.toastr.success("Floor Has Been Successfully Updated!", "Info Message");
        this.updatefloormodel(this.designid, this.floorobject);
        setTimeout(() => {
          this.fetchingfloordata();
        }, 1500);
        this.setDefault();
      }, err => {
        this.toastr.error("Floor Has Been failed to Update!", "Info Message");
      });;
    }
  }

  editFieldValue(floor: any) {
    console.log(floor);
    let floor1: Floors = {
      ID: floor.id,
      FloorName: floor.data.FloorName,
      ConstructionRValue: floor.data.ConstructionRValue,
      Description: floor.data.Description,
      DesignID: floor.data.DesignID,
      ProjectID: floor.data.ProjectID,
      UserID: floor.data.UserID
    };
    this.floorobject = Object.assign({}, floor1);
    console.log()
  }



  deleteFieldValue(id: string, floori: any) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.floorservice.deletefloor(id).subscribe(res => {
        this.toastr.success("Floor has been deleted!", "Info Message!");
        this.deletefloormodel(this.designid, floori);
        setTimeout(() => {
          this.fetchingfloordata();
        }, 1500);
      }, err =>{
        this.toastr.error("Something wrong!", "Error Message!");
      });
    }
  }

  updatefloormodel(designid: string, floor: Floors){
    this.buildingmodelservice.floormodelGet(designid);
    if(this.buildingmodelservice.floormodellist.length !== 0){
      for(let i of this.buildingmodelservice.floormodellist){
        if(i.data.Floor.FloorName === floor.FloorName){
          if(i.data.Floor.ConstructionRValue === floor.ConstructionRValue){
            i.data.Floor.ConstructionRValue = floor.ConstructionRValue;
            this.buildingmodelservice.floormodelUpdate(i.id, i.data, this.designid).subscribe(res => {
              this.toastr.success("Floor model successfully updated!", "Info Message");

              this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
            }, err => {
              this.toastr.error("Floor model failed to updated!", "Info Message");
            });
          }
        }
      }
    }
  }

  deletefloormodel(designid: string, floori: any){
    this.buildingmodelservice.floormodelGet(designid);
    if(this.buildingmodelservice.floormodellist.length !== 0){
      for(let i of this.buildingmodelservice.floormodellist){
        if(i.data.Floor.FloorName === floori.FloorName){
          i.data.Floor = {};
          this.buildingmodelservice.floormodelUpdate(i.id, i.data, this.designid).subscribe(res => {
            this.toastr.success("Update model successfully", "Info Message");

            this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
          }, err => {
            this.toastr.error("Update model failed", "Info Message");
          });
        }
      }
    }
  }

  setdefault(){
    this.loginservice.registermember = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }

}
