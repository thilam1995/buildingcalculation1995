import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { LocalStorage } from 'ngx-webstorage';
import { Register } from 'src/app/models/register';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ToastrService } from 'ngx-toastr';
import { FloorService } from 'src/app/service/floor.service';
import { NgForm } from '@angular/forms';

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
    private toastr: ToastrService, private floorservice: FloorService) {
      this.route.queryParams.subscribe(params => {
        this.projectid = params['projectid'];
        this.designid = params['designid'];
      });
      this.setdefault();
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
      UserID: null
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
      this.floorobject = {
        FloorName: form.value.floorname,
        ConstructionRValue: Number(form.value.constructionrvalue),
        Description: form.value.description,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
      const found = this.floorservice.floorlist.some(x => {
        return x.data.SkylightsName === this.floorobject.FloorName
      }); //This boolean will detect if the name is existed to prevent duplicate with different value

      if(!found){
        this.floorservice.addfloor(this.floorobject).subscribe(res => {
          this.toastr.success("Completed Floor Success!", "Info Message");
          setTimeout(() => {
            this.fetchingfloordata();
          }, 1500);
          this.setDefault();
        }, err => {
          this.toastr.error("Completed Floor failed!", "Info Message");
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
        this.toastr.success("Updated Floor Success!", "Info Message");
        setTimeout(() => {
          this.fetchingfloordata();
        }, 1500);
        this.setDefault();
      }, err => {
        this.toastr.error("Updated Floor failed!", "Info Message");
      });;
    }
  }

  editFieldValue(floor: any) {
    let floor1: Floors = {
      ID: floor.id,
      FloorName: floor.data.floorname,
      ConstructionRValue: floor.data.constructionrvalue,
      Description: floor.data.description,
      DesignID: floor.data.DesignID,
      ProjectID: floor.data.ProjectID,
      UserID: floor.data.UserID
    };
    this.floorobject = Object.assign({}, floor1);
  }



  deleteFieldValue(id: string) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.floorservice.deletefloor(id).subscribe(res => {
        this.toastr.success("Deleted floor!", "Info Message!");
        setTimeout(() => {
          this.fetchingfloordata();
        }, 1500);
      }, err =>{
        this.toastr.error("Something wrong!", "Error Message!");
      });
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
