import { Component, OnInit, Input } from '@angular/core';
import { WindowObject } from 'src/app/models/windowobject';
import { NgForm } from '@angular/forms';
import { LocalStorage } from 'ngx-webstorage';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/models/register';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';


@Component({
  selector: 'app-windowform',
  templateUrl: './windowform.component.html',
  styleUrls: ['./windowform.component.css']
})
export class WindowformComponent implements OnInit {

  windowobject: WindowObject = null;
  windowobjectlist = [];

  designid: string = "";
  projectid: string = "";
  registeruser: Register;
  owaList = [0, 0.05, 0.1, 0.15, 0.2, 0.25,
    0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6,
    0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1];

  shadeList = [
    { percentage: 0, shade: "Unshaded" },
    { percentage: 0.25, shade: "shaded" },
    { percentage: 0.5, shade: "shaded" },
    { percentage: 0.75, shade: "shaded" },
    { percentage: 1, shade: "Fully shaded" }
  ];
  constructor(private wallservice: WalldoorwindowService, public route: ActivatedRoute, private loginservice: LoginserviceService,
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
    this.setDefault();
  }

  setDefault() {
    this.windowobject = {
      WindowName: null,
      ConstructionRValue: null,
      Width: null,
      Height: null,
      Area: null,
      ID: null,
      OWA: null,
      ShadePercent: null,
      DesignID: null,
      ProjectID: null,
      UserID: null
    };
  }

  ngOnInit() {
    this.fetchingwindowdata();
  }

  fetchingwindowdata() {
    // this.wallservice.windowlistdata(this.designid).subscribe(res => {
    //   this.windowobjectlist = res;

    // }, err => {
    //   this.toastr.error("Something wrong", "Error Message!");
    // });
    this.wallservice.windowlistdata(this.designid);
  }

  onSubmit(form: NgForm) {
    if (form.value.id === null) {
      this.windowobject = {
        WindowName: form.value.windowName,
        ConstructionRValue: Number(form.value.constructionRValue),
        Width: Number(form.value.windowWidth),
        Height: Number(form.value.windowsHeight),
        Area: Number(this.windowobject.Area),
        OWA: Number(form.value.owa),
        ShadePercent: Number(form.value.shadepercent),
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };

      const found = this.wallservice.windowlist.some(x => {
        return x.data.WindowName === this.windowobject.WindowName
      }); //This boolean will detect if the window name is existed to prevent duplicate with different value
      if (!found) {
        this.wallservice.windowposting(this.windowobject, this.designid).subscribe(res => {
          this.toastr.success("Complete Wall Success.", "Successful");
          setTimeout(() => {
            this.fetchingwindowdata();
          }, 1500);
          this.setDefault();
        }, err => {
          this.toastr.error("Complete window failed.", "Successful");
        });
      } else {
        this.toastr.warning("The window name is existed.", "No Duplicate Name");
        form.reset();
      }


    } else {
      this.windowobject = {
        ID: form.value.id,
        WindowName: form.value.windowName,
        ConstructionRValue: Number(form.value.constructionRValue),
        Width: Number(form.value.windowWidth),
        Height: Number(form.value.windowsHeight),
        Area: Number(this.windowobject.Area),
        OWA: Number(form.value.owa),
        ShadePercent: Number(form.value.shadepercent),
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
      //console.log(this.windowobject);

      this.wallservice.windowput(this.windowobject, this.designid).subscribe(res => {
        this.toastr.success("Update Wall Successfully", "Info Message!");
        this.updatewindowvalue(this.designid, this.windowobject);
        setTimeout(() => {
          this.fetchingwindowdata();
        }, 1500);
      }, err => {
        this.toastr.error("Update Wall failed", "Info Message!");
      });
    }
  }


  editFieldValue(window: any) {
    let window1: WindowObject = {
      WindowName: window.data.WindowName,
      ConstructionRValue: window.data.ConstructionRValue,
      Width: window.data.Width,
      Height: window.data.Height,
      Area: window.data.Area,
      ID: window.id,
      OWA: window.data.OWA,
      ShadePercent: window.data.ShadePercent,
      DesignID: window.data.DesignID,
      ProjectID: window.data.ProjectID,
      UserID: window.data.UserID
    }

    this.windowobject = Object.assign({}, window1);
  }


  deleteFieldValue(id: string, window: any) {
    if (confirm("Are you sure to delete this item?") === true) {
      this.deletewindowvalue(this.designid, window);
      this.wallservice.windowdelete(id, this.designid).subscribe(res => {
        this.toastr.success("Delete successfully", "Info Message!");
        //this.fetchingwindowdata();
        this.deletewindowvalue(this.designid, window);
        setTimeout(() => {
          this.fetchingwindowdata();
        }, 1500);

      }, err => {
        this.toastr.error("Delete failed", "Info Message!");
      });
    }
  }

  deletewindowvalue(id: string, windowi: any) {
    this.buildingmodelservice.fetchwallwindowdoormodel(id);
    if (this.buildingmodelservice.wallwindowdoormodellist.length !== 0) {
      for (let i of this.buildingmodelservice.wallwindowdoormodellist) {
        let windowmodellist: Array<any> = i.data.Window;
        const found = windowmodellist.some(x => {
          return x.WindowName === windowi.WindowName
        }); //This boolean will detect if the name is existed to prevent duplicate with different value
        if(found){
          i.data.Window = windowmodellist.filter(x => x.WindowName !== windowi.WindowName);
          //this.buildingmodelservice.wallwindowdoormodelUpdate(i.id, i.data, this.designid);
          this.buildingmodelservice.wallwindowdoormodelUpdate(i.id, i.data, this.designid).subscribe(res => {
            this.toastr.success("Update model successfully", "Info Message");
  
            this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
          }, err => {
            this.toastr.error("Update model failed", "Info Message");
          });
        }
      }
    }
  }

  updatewindowvalue(id: string, window: WindowObject) {
    this.buildingmodelservice.fetchwallwindowdoormodel(id);
    if (this.buildingmodelservice.wallwindowdoormodellist.length !== 0) {
      for (let i of this.buildingmodelservice.wallwindowdoormodellist) {
        let windowmodellist: Array<any> = i.data.Window;
        //console.log(windowmodellist);
        const found = windowmodellist.some(x => {
          return x.WindowName === window.WindowName
        }); //This boolean will detect if the name is existed to prevent duplicate with different value
        if (found) {
          windowmodellist.forEach((element, index) => {
            if (element.WindowName === window.WindowName) {
              element.ConstructionRValue = window.ConstructionRValue;
              element.Width = window.Width;
              element.Height = window.Height;
              element.OWA = window.OWA;
              element.ShadePercent = window.ShadePercent;
            }
          });

          i.data.Window = windowmodellist;
          //console.log(windowmodellist);
          this.buildingmodelservice.wallwindowdoormodelUpdate(i.id, i.data, this.designid).subscribe(res => {
            this.toastr.success("Update model successfully", "Info Message");

            this.buildingmodelservice.wallwindowdoormodelGet(this.designid);
          }, err => {
            this.toastr.error("Update model failed", "Info Message");
          });
        }


      }
      setTimeout(() => {
        this.setDefault();
      }, 2000);

    } else {
      this.setDefault();
    }

  }



  onKeyWidth(event: any) { // without type info
    if (event.target.value === "") {
      this.windowobject.Area = 0;
    } else {
      this.windowobject.Width = event.target.value;
      this.windowobject.Area = this.windowobject.Width * this.windowobject.Height
    }

  }

  onKeyHeight(event: any) { // without type info
    if (event.target.value === "") {
      this.windowobject.Area = 0;
    } else {
      this.windowobject.Height = event.target.value;
      this.windowobject.Area = this.windowobject.Width * this.windowobject.Height
    }

  }

}
