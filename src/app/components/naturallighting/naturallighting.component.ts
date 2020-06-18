import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { DesignService } from 'src/app/service/design.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';
import { Register } from 'src/app/models/register';
import { RoomserviceService } from 'src/app/service/roomservice.service';
import { Design } from 'src/app/models/design';
import { Project } from 'src/app/models/project';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-naturallighting',
  templateUrl: './naturallighting.component.html',
  styleUrls: ['./naturallighting.component.css']
})
export class NaturallightingComponent implements OnInit {

  projectid: string = "";
  designid: string = "";
  registeruser: Register;
  designobject: Design;
  projectobject: Project;

  iscompliance: boolean = false;
  pointforlivingroom: number = 0;
  pointformainbedroom: number = 0;
  pointforotherhabitroom: number = 0;
  compliancepoint: number = 0;

  numbofroom: number = 0;
  ispasslist = [];
  roomlist = [];
  livingroompasslist = [];
  mainbedpasslist = [];
  otherhabitpasslist = [];
  studioroompasslist = [];
  count: any = {};
  otherhabitnum: number = 0;
  otherhabitpassnum: number = 0;
  primarybednum: number = 0;
  primarybedpassnum: number = 0;
  livingroomnum: number = 0;
  livingroompassnum: number = 0;
  studioroomnum: number = 0;
  studioroompassnum: number = 0;

  currentroute: string = "";

  constructor(public route: ActivatedRoute,
    private router: Router, private loginservice: LoginserviceService,
    private buildingmodelservice: BuildingmodelService, private designservice: DesignService,
    private toastr: ToastrService, private projectservice: ProjectService,
    public roomserv: RoomserviceService) {
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
    this.currentroute = this.route.snapshot.url[0].path;
    console.log(this.route.snapshot.url[0].path);
  }

  ngOnInit() {
    this.setdefault();
    this.fetchingmodel();
  }

  setdefault() {
    this.designobject = {
      DesignID: "",
      DesignName: "",
      TargetRating: null,
      CompletedBy: "",
      DrawingSet: "",
      Typology: "",
      DateCreated: null,
      ProjectID: "",
      UserID: "",
      Climatetype: "",
      City: "",
      StreetName: "",
      DateUpdate: "",
      Postcode: "",
      FloorArea: null
    };
    this.projectobject = {
      ProjectID: "",
      ProjectName: "",
      DateCreated: "",
      DateModified: "",
      UserID: ""
    };
  }

  returntoSchedule() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  fetchingmodel() {

    this.projectservice.getprojectid(this.projectid).subscribe(x => {
      this.projectobject = {
        ProjectID: x.id,
        ProjectName: x.data.ProjectName,
        DateCreated: x.data.DateCreated,
        DateModified: x.data.DateModified,
        UserID: x.data.UserID
      }
    }, err => {
      this.toastr.error("Something wrong!", "Error Message");
    });
    this.designservice.getdesignbyID(this.designid).subscribe(res => {
      //console.log(res);
      this.designobject = {
        DesignID: res.id,
        DesignName: res.data.DesignName,
        TargetRating: res.data.TargetRating,
        CompletedBy: res.data.CompletedBy,
        DrawingSet: res.data.DrawingSet,
        Typology: res.data.Typology,
        DateCreated: res.data.DateCreated,
        ProjectID: res.data.ProjectID,
        UserID: res.data.UserID,
        Climatetype: res.data.Climatetype,
        City: res.data.City,
        StreetName: res.data.StreetName,
        DateUpdate: res.data.DateUpdate,
        Postcode: res.data.Postcode,
        FloorArea: res.data.FloorArea
      };
      //console.log(this.targetingschedule);
    }, err => {
      this.toastr.error("Something wrong!", "Error Message");
    });
    //this.roomserv.getallroombydesignid(this.designid);

    this.roomserv.fetchroombyid(this.designid).subscribe(res => {
      this.roomlist = res;

      this.roomlist.forEach(e => {
        if (e.data.RoomID !== "Bathroom") {
          let object = { roomname: "", totalwindowarea: 0, roomfloorarea: 0, shadinglevel: "", naturalrequire: 0, naturalachieved: 0, iscompliance: false };
          let roompassobject = { roomname: "", iscompliance: false };
          let ispass: boolean = false;
          let totalwindowarea: number = 0;
          let naturallightrequire: number = 0;
          let naturallightachieve: number = 0;
          let numberofshaded: number = 0;
          let numberofunshaded: number = 0;
          let shadelevel: string = "";
          e.data.WindowList.forEach(el => {
            totalwindowarea += el.WindowID.Area;
            if (el.IsShading) {
              ++numberofshaded;
            } else {
              ++numberofunshaded;
            }
          });
          // for(let el of e.data.WindowList){
          //   totalwindowarea += el.WindowID.Area;
          //   if (el.IsShading) {
          //     ++numberofshaded;
          //   } else {
          //     ++numberofunshaded;
          //   }
          // }

          naturallightachieve = totalwindowarea / e.data.RoomArea;
          shadelevel = (numberofshaded === e.data.WindowList.length && numberofshaded !== 0)
            || (numberofshaded !== 0 && (numberofshaded >= numberofunshaded || numberofshaded <= numberofunshaded))
            ? "Shade" : "Unshaded";
          naturallightrequire = shadelevel === "Shade" ? 0.20 : 0.15;
          ispass = naturallightachieve >= naturallightrequire;
          object = { roomname: e.data.RoomType, totalwindowarea: totalwindowarea, roomfloorarea: e.data.RoomArea, shadinglevel: shadelevel, naturalrequire: naturallightrequire, naturalachieved: naturallightachieve, iscompliance: ispass }
          roompassobject = { roomname: object.roomname, iscompliance: object.iscompliance };
          this.ispasslist.push(roompassobject);
          object = { roomname: "", totalwindowarea: 0, roomfloorarea: 0, shadinglevel: "", naturalrequire: 0, naturalachieved: 0, iscompliance: false };
          roompassobject = { roomname: "", iscompliance: false };
          ispass = false;
          totalwindowarea = 0;
          naturallightrequire = 0;
          naturallightachieve = 0;
          numberofshaded = 0;
          numberofunshaded = 0;
          shadelevel = "";
        }

      });

      if (this.ispasslist.length !== 0) {
        this.ispasslist.forEach(e => {
          if (e.roomname === "studiodwelling") {
            if (e.iscompliance) {
              this.studioroompassnum += 1;
            }
            this.studioroomnum += 1;
          } else if (e.roomname === "MainBedroom") {
            if (e.iscompliance) {
              this.primarybedpassnum += 1;
            }
            this.primarybednum += 1;
          }
          else if (e.roomname === "OtherHabitableroom") {
            if (e.iscompliance) {
              this.otherhabitpassnum += 1;
            }
            this.otherhabitnum += 1;
          }
          else if (e.roomname === "Mainlivingroomarea") {
            if (e.iscompliance) {
              this.livingroompassnum += 1;
            }
            this.livingroomnum += 1;
          }
        });
      }

      setTimeout(() => {
        this.finalcalculate();
      }, 1600);
    });
  }

  finalcalculate() {
    
    console.log("Studio: " + this.studioroomnum + " Pass: " + this.studioroompassnum);
    console.log("Living: " + this.livingroomnum + " Pass: " + this.livingroompassnum);
    console.log("Primary: " + this.primarybednum + " Pass: " + this.primarybedpassnum);
    console.log("Other habitable Room: " + this.otherhabitnum + " Pass: " + this.otherhabitpassnum);

    if (this.ispasslist.length !== 0) {
      this.ispasslist.forEach(e => {
        if (e.roomname === "MainBedroom") {
          if (e.iscompliance) {
            this.mainbedpasslist.push(e.iscompliance);
          }
        } else if (e.roomname === "OtherHabitableroom") {
          if (e.iscompliance) {
            this.otherhabitpasslist.push(e.iscompliance);
          }
        } else if (e.roomname === "Mainlivingroomarea") {
          if (e.iscompliance) {
            this.livingroompasslist.push(e.iscompliance);
          }
        } else if (e.roomname === "studiodwelling") {
          if (e.iscompliance) {
            this.studioroompasslist.push(e.iscompliance);
          }
        }
      });
    }

    console.log(this.mainbedpasslist.length > 0 ? this.mainbedpasslist.every(Boolean) : false);
    console.log(this.otherhabitpasslist.length > 0 ? this.otherhabitpasslist.every(Boolean) : false);
    console.log(this.livingroompasslist.length > 0 ? this.livingroompasslist.every(Boolean) : false);
    console.log(this.studioroompasslist.length > 0 ? this.studioroompasslist.every(Boolean) : false);
  

    if (this.ispasslist.length === 1) {
      console.log(1);
      if (this.studioroompasslist.length === 1 ? this.studioroompasslist.every(Boolean) : false) {
          this.compliancepoint = 3;
      } else if (this.mainbedpasslist.length === 1 ? this.mainbedpasslist.every(Boolean) : false) {
          this.compliancepoint = 3;
      } else if (this.livingroompasslist.length === 1 ? this.livingroompasslist.every(Boolean) : false) {
          this.compliancepoint = 3;

      } else if (this.otherhabitpasslist.length === 1 ? this.otherhabitpasslist.every(Boolean) : false) {
          this.compliancepoint = 3;
      }
    } else {

      if (this.ispasslist.length === 2) {
        if (this.livingroompasslist.length === 1 ? this.livingroompasslist.every(Boolean) : false) {
          this.compliancepoint += 2;
          if (this.mainbedpasslist.length === 1 ? this.mainbedpasslist.every(Boolean) : false) {
            this.compliancepoint += 1;
          } else if (this.otherhabitpasslist.length === 1 ? this.otherhabitpasslist.every(Boolean) : false) {
            this.compliancepoint += 1;
          }
        } else if (this.livingroompasslist.length === 0) {
          console.log(2);
          if (this.mainbedpasslist.length === 1 ? this.mainbedpasslist.every(Boolean) : false) {
            this.compliancepoint += (this.mainbedpasslist.every(Boolean) ? 2 : 0);
            if (this.otherhabitpasslist.length === 1 ? this.otherhabitpasslist.every(Boolean) : false) {
              this.compliancepoint += (this.otherhabitpasslist.every(Boolean) ? 1 : 0);
            }
          }
          else if (this.otherhabitpasslist.length === 2) {
            this.compliancepoint = ((this.otherhabitpasslist.length === 2 ? this.otherhabitpasslist.every(Boolean) : false) ? 3 : 0);
          }
        } 
      } else if (this.ispasslist.length >= 3) {
        console.log(3);
        if (this.livingroompasslist.length === 1 && this.mainbedpasslist.length === 1 && this.otherhabitpasslist.length >= 1) {
          this.compliancepoint += ((this.livingroompasslist.length === 1 ? this.livingroompasslist.every(Boolean) : false) ? 1 : 0) + ((this.mainbedpasslist.length === 1 ? this.mainbedpasslist.every(Boolean) : false) ? 1 : 0) + ((this.otherhabitpasslist.length >= 1 ? this.otherhabitpasslist.every(Boolean) : false) ? 1 : 0);
        } else if (this.livingroompasslist.length === 1 && this.otherhabitpasslist.length >= 2) {
          this.compliancepoint += ((this.livingroompasslist.length === 1 ? this.livingroompasslist.every(Boolean) : false) ? 2 : 0) + ((this.otherhabitpasslist.length >= 2 ? this.otherhabitpasslist.every(Boolean) : false) ? 1 : 0);
        } else if(this.mainbedpasslist.length === 1 && this.otherhabitpasslist.length >= 2){
          this.compliancepoint += ((this.mainbedpasslist.length === 1 ? this.mainbedpasslist.every(Boolean) : false) ? 2 : 0) + ((this.otherhabitpasslist.length >= 2 ? this.otherhabitpasslist.every(Boolean) : false) ? 1 : 0);
        }else if (this.otherhabitpasslist.length >= 3){
          this.compliancepoint = ((this.otherhabitpasslist.length > 2 ? this.otherhabitpasslist.every(Boolean) : false) ? 3 : 0);
        }

      }
    }


  }

  downloadresult() {
    let date = new Date();
    let stringdate: string = "";
    stringdate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
    this.toastr.info("Please wait until finishing rendering!");
    html2canvas(document.querySelector('#content'),
      { scale: 2 }
    ).then(canvas => {

      let pdf = new jsPDF('p', 'mm', 'a4'), margin = {
        top: 100,
        bottom: 10,
        left: 10,
        width: 600,
      };
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 100);
      pdf.fromHTML(canvas, margin.left, margin.top, {
        // y coord
        width: margin.width // max width of content on PDF
      }, dispose => {
        this.toastr.success("Rendering Completed!");
        pdf.save("naturallighting_" + stringdate);
      }, margin)
    });
  }

  getcalculateheatloss() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1heatingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  getcalculatenaturallighting() {
    if (this.currentroute === "ehc1naturallightingenergy") {
      alert("You are now in EHC-3 Natural Lighting!");
    }
    // this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1naturallightingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  getcalculatecoolingenergy() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1coolingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  getcalculatepassive() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1passiveventilation"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }
}
