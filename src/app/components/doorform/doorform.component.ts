import { Component, OnInit, Input } from '@angular/core';
import { Door } from 'src/app/models/door';
import { LocalStorage } from 'ngx-webstorage';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/models/register';
import { NgForm } from '@angular/forms';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';

@Component({
  selector: 'app-doorform',
  templateUrl: './doorform.component.html',
  styleUrls: ['./doorform.component.css']
})
export class DoorformComponent implements OnInit {

  doorobject: Door;
  @Input() doorobjectlist = [];
  designid: string = "";
  projectid: string = "";
  registeruser: Register;
  constructor(private wallservice: WalldoorwindowService, public route: ActivatedRoute, private loginservice: LoginserviceService,
    private toastr: ToastrService, buildingmodelservice: BuildingmodelService) {
    this.route.queryParams.subscribe(params => {
      this.projectid = params['projectid'];
      this.designid = params['designid'];
    });
    this.setdefault();
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    this.loginservice.currentUser.subscribe(x => {
      if (x === null) {
        this.registeruser = loginapp;
      } else {
        this.registeruser = x;
      }

    });
    this.setDefault();

  }

  ngOnInit() {
    this.wallservice.doorlistdata(this.designid);
  }



  fetchingdoordata() {
    this.wallservice.doorlistdata(this.designid);
  }

  setDefault() {
    this.doorobject = {
      DesignID: null,
      ID: null,
      ProjectID: null,
      UserID: null,
      DoorName: null,
      Area: null,
      ConstructionRValue: null,
      Height: null,
      Width: null
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.id === null) {
      this.doorobject = {
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID,
        DoorName: form.value.doorName,
        Area: Number(this.doorobject.Area),
        ConstructionRValue: Number(form.value.constructionRValue),
        Height: Number(form.value.height),
        Width: Number(form.value.width)
      };

      const found = this.wallservice.doorlist.some(x => {
        return x.data.DoorName === this.doorobject.DoorName
      }); //This boolean will detect if the wall name is existed to prevent duplicate with different value

      if (!found) {
        this.wallservice.doorposting(this.doorobject, this.designid).subscribe(res => {
          this.toastr.success("Complete door Success.", "Successful");
          setTimeout(() => {
            this.fetchingdoordata();
          }, 1500);
          this.setDefault();
        }, err => {
          this.toastr.error("Complete door failed.", "Successful");
        });
      } else {
        this.toastr.warning("The door name is existed.", "No Duplicate Name");
        form.reset();
      }

    } else {
      this.doorobject = {
        ID: form.value.id,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID,
        DoorName: form.value.doorName,
        Area: Number(this.doorobject.Area),
        ConstructionRValue: Number(form.value.constructionRValue),
        Height: Number(form.value.height),
        Width: Number(form.value.width)
      };

      this.wallservice.doorput(this.doorobject, this.designid).subscribe(res => {
        this.toastr.success("Update Door Successfully", "Info Message!");
        setTimeout(() => {
          this.fetchingdoordata();
        }, 1500);

      }, err => {
        this.toastr.error("Update Door failed", "Info Message!");
      });
    }
  }

  editFieldValue(Door: any) {
    let door: Door = {
      ID: Door.id,
      DoorName: Door.data.DoorName,
      ConstructionRValue: Door.data.ConstructionRValue,
      Width: Door.data.Width,
      Height: Door.data.Height,
      Area: Door.data.Area,
      DesignID: this.designid,
      ProjectID: this.projectid,
      UserID: this.registeruser.ID
    };

    this.doorobject = Object.assign({}, door);
  }





  deleteFieldValue(id: string) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.wallservice.doordelete(id, this.designid).subscribe(res => {
        this.toastr.success("Delete successfully", "Info Message!");
        setTimeout(() => {
          this.fetchingdoordata();
        }, 1500);
      }, err => {
        this.toastr.error("Delete failed", "Info Message!");
      });
    }
  }

  onKeyWidth(event: any) { // without type info
    if (event.target.value === "") {
      this.doorobject.Area = 0;
    } else {
      this.doorobject.Width = event.target.value;
      this.doorobject.Area = this.doorobject.Width * this.doorobject.Height;
    }

  }

  onKeyHeight(event: any) { // without type info
    if (event.target.value === "") {
      this.doorobject.Area = 0;
    } else {
      this.doorobject.Height = event.target.value;
      this.doorobject.Area = this.doorobject.Width * this.doorobject.Height;
    }

  }

  setdefault() {
    this.loginservice.registermember = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }

}
