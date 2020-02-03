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
  compliancepoint: number = 0;

  ispasslist = [];
  isbedpassedlist = [];
  roomlist = [];
  count: any = {};
  otherhabitnum: number = 0;
  otherhabitpassnum: number = 0;
  primarybednum: number = 0;
  primarybedpassnum: number = 0;
  livingroomnum: number = 0;
  livingroompassnum: number = 0;
  studioroomnum: number = 0;
  studioroompassnum: number = 0;


  constructor(public route: ActivatedRoute,
    private router: Router, private loginservice: LoginserviceService,
    private buildingmodelservice: BuildingmodelService, private designservice: DesignService,
    private toastr: ToastrService, private projectservice: ProjectService,
    private roomserv: RoomserviceService) {
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
    this.roomserv.getallroombydesignid(this.designid);

    this.roomserv.fetchroombyid(this.designid).subscribe(res => {
      this.roomlist = res;
      // this.roomlist.forEach(e => {
      //   if (e.data.RoomID !== "Bathroom") {
      //     let object = { rooname: "", totalwindowarea: 0, roomfloorarea: 0, shadinglevel: "", naturalrequire: 0, naturalachieved: 0, iscompliance: false };
      //     let ispass: boolean = false;
      //     let totalwindowarea: number = 0;
      //     let naturallightrequire: number = 0;
      //     let naturallightachieve: number = 0;
      //     let numberofshaded: number = 0;
      //     let numberofunshaded: number = 0;
      //     let shadelevel: string = "";
      //     e.data.WindowList.forEach(el => {
      //       totalwindowarea += el.WindowID.Area;
      //       if (el.IsShading) {
      //         ++numberofshaded;
      //       } else {
      //         ++numberofunshaded;
      //       }
      //     });
      //     // for(let el of e.data.WindowList){
      //     //   totalwindowarea += el.WindowID.Area;
      //     //   if (el.IsShading) {
      //     //     ++numberofshaded;
      //     //   } else {
      //     //     ++numberofunshaded;
      //     //   }
      //     // }

      //     naturallightachieve = totalwindowarea / e.data.RoomArea;
      //     shadelevel = (numberofshaded === e.data.WindowList.length && numberofshaded !== 0)
      //       || (numberofshaded !== 0 && (numberofshaded >= numberofunshaded || numberofshaded <= numberofunshaded))
      //       ? "Shade" : "Unshaded";
      //     naturallightrequire = shadelevel === "Shade" ? 0.20 : 0.15;
      //     ispass = naturallightachieve >= naturallightrequire;
      //     object = { rooname: e.data.RoomType, totalwindowarea: totalwindowarea, roomfloorarea: e.data.RoomArea, shadinglevel: shadelevel, naturalrequire: naturallightrequire, naturalachieved: naturallightachieve, iscompliance: ispass }
      //     this.ispasslist.push(object.iscompliance);
      //     object = { rooname: "", totalwindowarea: 0, roomfloorarea: 0, shadinglevel: "", naturalrequire: 0, naturalachieved: 0, iscompliance: false };
      //     ispass = false;
      //     totalwindowarea = 0;
      //     naturallightrequire = 0;
      //     naturallightachieve = 0;
      //     numberofshaded = 0;
      //     numberofunshaded = 0;
      //     shadelevel = "";
      //   }

      // });

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


      // this.iscompliance = this.ispasslist.every(Boolean);
      // if(this.roomlist.length !== 0){
      //   if(this.iscompliance){
      //     this.compliancepoint = 3;
      //   }else{
      //     this.compliancepoint = 0;
      //   }
      // }else{
      //   this.compliancepoint = 0;
      // }
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

        console.log("Studio: " + this.studioroomnum + " Pass: " + this.studioroompassnum);
        console.log("Living: " + this.livingroomnum + " Pass: " + this.livingroompassnum);
        console.log("Primary: " + this.primarybednum + " Pass: " + this.primarybedpassnum);
        console.log("Other habitable Room: " + this.otherhabitnum + " Pass: " + this.otherhabitpassnum);


        if (this.roomserv.numofroom === 1) {
          if ((this.studioroompassnum === 1 && this.studioroomnum === 1) && this.studioroompassnum === this.studioroomnum) {
            this.compliancepoint += 3;
          } else if ((this.primarybednum === 1 && this.primarybednum === 1) && this.primarybednum === this.primarybednum) {
            this.compliancepoint += 3;
          } else if ((this.livingroomnum === 1 && this.livingroomnum === 1) && this.livingroomnum === this.livingroomnum) {
            this.compliancepoint += 3;
          }
          else if (this.otherhabitnum === 1 && this.otherhabitnum === this.otherhabitpassnum) {
            this.compliancepoint += 3;
          }
        } else {
          if (this.livingroompassnum === 1 && this.livingroomnum === 1 && this.livingroompassnum === this.livingroomnum) {
            let livingpoint = 0;
            if(this.primarybednum > 0 && this.primarybednum === this.primarybedpassnum && this.otherhabitnum === 0){
              livingpoint = 2;
            }else if(this.primarybednum > 0 && this.primarybednum === this.primarybedpassnum && this.otherhabitnum > 0){
              livingpoint = 1;
            }
            this.compliancepoint += livingpoint;
          }

          if (this.otherhabitnum > 0 && this.otherhabitnum === this.otherhabitpassnum) {
            this.compliancepoint += 1;
          }
          if (this.primarybednum === 1 && this.primarybednum === this.primarybedpassnum) {
            this.compliancepoint += 1;
          }
        }
      }



      this.ispasslist.forEach(e => {
        if (e.roomname === "Bedroom") {
          this.isbedpassedlist.push(e.iscompliance);
        }
      });
      this.iscompliance = this.isbedpassedlist.every(Boolean);
      console.log(this.ispasslist);

      if (this.ispasslist.length !== 0) {
        this.count = this.ispasslist.reduce((c, { roomname: key }) =>
          (c[key] = (c[key] || 0) + 1, c), {}
        );
        console.log(this.count);
      }

    });

  }

  downloadresult(){
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
        pdf.save("naturallighting_"+stringdate);
      }, margin)
    });
  }

}
