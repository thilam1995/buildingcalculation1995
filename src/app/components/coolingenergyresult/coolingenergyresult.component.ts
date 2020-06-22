import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { DesignService } from 'src/app/service/design.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';
import { RoomserviceService } from 'src/app/service/roomservice.service';
import { Register } from 'src/app/models/register';
import { Design } from 'src/app/models/design';
import { Project } from 'src/app/models/project';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-coolingenergyresult',
  templateUrl: './coolingenergyresult.component.html',
  styleUrls: ['./coolingenergyresult.component.css']
})
export class CoolingenergyresultComponent implements OnInit {

  projectid: string = "";
  designid: string = "";
  registeruser: Register;
  designobject: Design;
  projectobject: Project;

  roomlist = [];
  wallwindowdoormodellist = [];

  totalwallnorth: number = 0;
  totalwallsouth: number = 0;
  totalwalleast: number = 0;
  totalwallwest: number = 0;

  totalwindownorth: number = 0;
  totalwindoweast: number = 0;
  totalwindowwest: number = 0;
  totalwindowsouth: number = 0;

  owawindownorth: number = 0;
  owawindowsouth: number = 0;
  owawindoweast: number = 0;
  owawindowwest: number = 0;

  part1pass: boolean = false;
  part2of1pass: boolean = false;
  part2of2pass: boolean = false;
  part2pass: boolean = false;
  part3pass: boolean = false;

  windowhabitgreatthan5percentlist = [];
  isallwindowsecurelist = [];

  isallwindowmore30 = [];

  isallpass = [];

  numberpoint: number = 0;

  currentroute: string = "";
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

    this.buildingmodelservice.fetchwallwindowdoormodel(this.designid).subscribe(res => {
      this.wallwindowdoormodellist = res;

      this.wallwindowdoormodellist.forEach(e => {

        if (e.data.Orientation === "North") {
          this.totalwallnorth += Number(Number(e.data.Wall.Area).toFixed(2));
          if (e.data.Window.length > 0) {
            for (let y of e.data.Window) {
              this.totalwindownorth += Number(Number(y.Area).toFixed(2));
              this.owawindownorth += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
            }

          }

        }
        else if (e.data.Orientation === "South") {
          this.totalwallsouth += Number(Number(e.data.Wall.Area).toFixed(2));
          if (e.data.Window.length > 0) {
            for (let y of e.data.Window) {
              this.totalwindowsouth += Number(Number(y.Area).toFixed(2));
              this.owawindowsouth += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
            }

          }

        }
        else if (e.data.Orientation === "East") {
          this.totalwalleast += Number(Number(e.data.Wall.Area).toFixed(2));
          if (e.data.Window.length > 0) {
            for (let y of e.data.Window) {
              this.totalwindoweast += Number(Number(y.Area).toFixed(2));
              this.owawindoweast += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
            }

          }

        }
        else if (e.data.Orientation === "West") {
          this.totalwallwest += Number(Number(e.data.Wall.Area).toFixed(2));
          if (e.data.Window.length > 0) {
            for (let y of e.data.Window) {
              this.totalwindowwest += Number(Number(y.Area).toFixed(2));
              this.owawindowwest += Number(Number(y.OWA).toFixed(2)) * Number(Number(y.Area).toFixed(2));
            }

          }

        }
      });
      setTimeout(() => {
        this.finalcalculation();
      }, 1300);
    });

    this.roomserv.fetchroombyid(this.designid).subscribe(res => {
      this.roomlist = res;
      console.log(this.roomlist);
    });
  }

  returntoSchedule() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  getcalculateheatloss() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1heatingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  getcalculatenaturallighting() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1naturallightingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  getcalculatecoolingenergy() {
    if(this.currentroute === "ehc1coolingenergy"){
      alert("You are now in EHC-1 Cooling Energy!")
    }
    // this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1coolingenergy"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }
  
  getcalculatepassive() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/ehc1passiveventilation"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  finalcalculation() {
    this.part1pass = (0.27 > (this.totalwindoweast / this.totalwalleast)) && (0.27 > (this.totalwindownorth / this.totalwallnorth)) && (0.27 > (this.totalwindowwest / this.totalwallwest));

    this.roomlist.forEach(e => {
      let iscomplied: boolean = false;
      let netowa: number = 0;
      if (e.data.WindowList.length !== 0) {
        e.data.WindowList.forEach(a => {
          netowa += Number(Number(a.WindowID.OWA * a.WindowID.Area).toFixed(2));
        });
        iscomplied = (netowa / e.data.RoomArea) >= 0.05;
      }
      
      this.windowhabitgreatthan5percentlist.push(iscomplied);
    });

    this.roomlist.forEach(e => {
      let windowsecurelist = [];
      let isallsecure: boolean = false;
      if(e.data.WindowList.length !== 0){
        e.data.WindowList.forEach(element => {
          if(element.IsSafelysecure){
            windowsecurelist.push(element.IsSafelysecure);
          }
        });
      }

      if(e.data.WindowList.length === 0){
        isallsecure = false;
      }else{
        isallsecure = windowsecurelist.every(Boolean);
      }
      this.isallwindowsecurelist.push(isallsecure);
    });

    console.log(this.windowhabitgreatthan5percentlist);
    this.part2of1pass = this.windowhabitgreatthan5percentlist.every(Boolean);

    if(this.owawindownorth > ((this.designobject.FloorArea * 0.05) * 0.3)){
      this.isallwindowmore30.push(this.owawindownorth > ((this.designobject.FloorArea * 0.05) * 0.3));
    }

    if(this.owawindoweast > ((this.designobject.FloorArea * 0.05) * 0.3)){
      this.isallwindowmore30.push(this.owawindoweast > ((this.designobject.FloorArea * 0.05) * 0.3));
    }

    if(this.owawindowsouth > ((this.designobject.FloorArea * 0.05) * 0.3)){
      this.isallwindowmore30.push(this.owawindowsouth > ((this.designobject.FloorArea * 0.05) * 0.3));
    }

    if(this.owawindowwest > ((this.designobject.FloorArea * 0.05) * 0.3)){
      this.isallwindowmore30.push(this.owawindowwest > ((this.designobject.FloorArea * 0.05) * 0.3));
    }

    console.log(this.isallwindowmore30.length);
    this.part2of2pass = this.isallwindowmore30.length >= 2;

    this.part2pass = this.part2of1pass && this.part2of2pass;
    this.part3pass = this.isallwindowsecurelist.every(Boolean);

    this.isallpass.push(this.part1pass, this.part2pass, this.part3pass);


    let numofpass = 0;

    numofpass = this.isallpass.filter(x => x).length;

    if(numofpass === 3){
      this.numberpoint = 2;
    } else if(numofpass === 2){
      this.numberpoint = 1;
    } else{
      this.numberpoint = 0;
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
        pdf.save("coolingenergyresult_" + stringdate);
      }, margin)
    });
  }
}
