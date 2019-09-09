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

@Component({
  selector: 'app-roofskylineform',
  templateUrl: './roofskylineform.component.html',
  styleUrls: ['./roofskylineform.component.css']
})
export class RoofskylineformComponent implements OnInit {

  @Input() skylightsobject: Skylights;
  @Input() roofobject: Roof;

  @Input() skylightsobjectlist = [];
  @Input() roofobjectlist = [];
  designid: string = "";
  projectid: string = "";
  registeruser: Register;

  constructor(private roofskylightservice: RoofskylightService, public route: ActivatedRoute, private loginservice: LoginserviceService,
    private toastr: ToastrService) {
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
          this.fetchingroof();
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
        this.fetchingroof();
        this.setDefaultRoof();
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
          this.fetchingskylight();
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
        this.fetchingskylight();
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

  deleteFieldValueRoof(id: string) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.roofskylightservice.deleteroof(id).subscribe(
        res => {
          this.toastr.success("Deleted roof!", "Info Message!");
          this.fetchingroof();
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



  deleteFieldValueSkylight(id: string) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.roofskylightservice.deleteskylight(id).subscribe(
        res => {
          this.toastr.success("Deleted skylight!", "Error Message!");
          this.fetchingskylight();
          this.fetchingskylight();
        }, err => {
          this.toastr.error("Something wrong!", "Error Message!");
        }
      );
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
