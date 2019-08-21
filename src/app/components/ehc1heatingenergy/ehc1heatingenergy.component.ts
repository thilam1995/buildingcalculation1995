import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Roof } from 'src/app/models/roof';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { DesignService } from 'src/app/service/design.service';
import { Design } from 'src/app/models/design';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/models/register';
import * as jsPDF from 'jspdf';
import { ɵDomEventsPlugin } from '@angular/platform-browser';
declare var xepOnline: any;

@Component({
  selector: 'app-ehc1heatingenergy',
  templateUrl: './ehc1heatingenergy.component.html',
  styleUrls: ['./ehc1heatingenergy.component.css']
})
export class Ehc1heatingenergyComponent implements OnInit {

  @ViewChild('content', {static: true}) content: ElementRef;
  projectid: string = "";
  designid: string = "";

  location = "";
  targeting = "";
  climatezone = "";
  targetingschedule: any = null;

  schedulemethod = [];

  wallwindowdoormodellist = [];
  roofskylightmodellist = [];
  floormodellist = []

  designobject: Design;

  roofrvalue: number = 0;
  wallrvalue: number = 0;
  windowrvalue: number = 0;
  floorrvalue: number = 0;
  skylightrvalue: number = 0;

  totalarearoof: number = 0;
  totalareaskylight: number = 0;
  totalareawall: number = 0;
  totalareawindow: number = 0;
  totalareawindowless30: number = 0;
  totalareawindowmore30: number = 0;
  totalareafloor: number = 0;
  totalareadoor: number = 0;

  totalheatlosswall: number = 0;
  totalheatlosswindow: number = 0;
  totalheatlossdoor: number = 0;
  totalheatlossroof: number = 0;
  totalheatlossskylight: number = 0;
  totalheatlossfloor: number = 0;
  totalproposed: number = 0;


  totalheatlosswindowless30: number = 0;
  totalheatlosswindowmore30: number = 0;

  totalschedule: number = 0;

  totalwallnorth: number = 0;
  totalwallsouth: number = 0;
  totalwalleast: number = 0;
  totalwallwest: number = 0;

  totalwindownorth: number = 0;
  totalwindowsouth: number = 0;
  totalwindoweast: number = 0;
  totalwindowwest: number = 0;

  rooflist: Array<any> = [];
  skylightlist: Array<any> = [];
  walllist: Array<any> = [];
  floorlist: Array<any> = [];
  windowlist: Array<any> = [];
  doorlist: Array<any> = [];


  walldistinct = [];
  roofdistinct = [];
  skylightdistinct = [];
  floordistinct = [];
  windowdistinct = [];
  doordistinct = [];

  doornamelist = [];


  registeruser: Register;
  constructor(public route: ActivatedRoute,
    private router: Router, private loginservice: LoginserviceService,
    private buildingmodelservice: BuildingmodelService, private designservice: DesignService,
    private toastr: ToastrService) {
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
    this.featchingmodel();
    
  }

  setdefault() {
    this.designobject = {
      DesignID: "",
      DesignName: "",
      TargetRating: null,
      CompletedBy: "",
      DrawingSet: "",
      Typology: "",
      NumofHabitationroom: null,
      FloorArea: null,
      Location: null,
      ProjectID: "",
      UserID: ""
    };
  }

  featchingmodel() {


    this.designservice.getdesignbyID(this.designid).subscribe(res => {
      //console.log(res);
      this.designobject = {
        DesignID: res.id,
        DesignName: res.data.DesignName,
        TargetRating: res.data.TargetRating,
        CompletedBy: res.data.CompletedBy,
        DrawingSet: res.data.DrawingSet,
        Typology: res.data.Typology,
        NumofHabitationroom: Number(res.data.NumofHabitationroom),
        FloorArea: res.data.FloorArea,
        Location: res.data.Location,
        ProjectID: res.data.ProjectID,
        UserID: res.data.UserID
      };
      this.location = this.designobject.Location.data.place;
      this.targeting = this.designobject.TargetRating.data.Type;
      this.climatezone = this.designobject.Location.data.climatezone;
      this.targetingschedule = this.designobject.TargetRating.data.ClimatezoneList.find(x => x.climatezone === this.climatezone);
      this.schedulemethod = this.designobject.TargetRating.data.ClimatezoneList;
      this.skylightrvalue = this.targetingschedule.constructionrvalue.Skylight;
      this.roofrvalue = this.targetingschedule.constructionrvalue.Roof;
      this.wallrvalue = this.targetingschedule.constructionrvalue.Wall;
      this.floorrvalue = this.targetingschedule.constructionrvalue.Floor;
      this.windowrvalue = this.targetingschedule.constructionrvalue.Window;
      //console.log(this.targetingschedule);
    }, err => {
      this.toastr.error("Something wrong!", "Error Message");
    });
    
    this.startcalculate();
  }

  startcalculate() {
    this.buildingmodelservice.fetchwallwindowdoormodel(this.designid).subscribe(res => {
      this.wallwindowdoormodellist = res;
      this.walldistinct = Array.from(new Set(this.wallwindowdoormodellist.map((x: any) => x.data.Wall.WallName)));

      for (let i of this.wallwindowdoormodellist) {
        if (i.data.Window.length !== 0) {
          this.windowdistinct = Array.from(new Set(i.data.Window.map((x: any) =>
            x.WindowName
          )));
        }
      }
      for (let i of this.wallwindowdoormodellist) {
        if (i.data.Door !== null) {
          this.doornamelist.push(i.data.Door.DoorName);
        }
      }
      this.doordistinct = Array.from(new Set(this.doornamelist.map((x: any) =>
        x
      )));

      for (let i of this.wallwindowdoormodellist){
        if(i.data.Wall.Orientation === "North"){
          this.totalwallnorth = i.data.Wall.Area;
          if(i.data.Window.length > 0){
            for(let y of i.data.Window){
              this.totalwindownorth += y.Area
            }
          }

        }else if(i.data.Wall.Orientation === "South"){
          this.totalwallsouth = i.data.Wall.Area;
          if(i.data.Window.length > 0){
            for(let y of i.data.Window){
              this.totalwindowsouth += y.Area
            }
          }
        }else if(i.data.Wall.Orientation === "East"){
          this.totalwalleast = i.data.Wall.Area;
          if(i.data.Window.length > 0){
            for(let y of i.data.Window){
              this.totalwindoweast += y.Area
            }
          }
        }else if(i.data.Wall.Orientation === "West"){
          this.totalwallwest = i.data.Wall.Area;
          if(i.data.Window.length > 0){
            for(let y of i.data.Window){
              this.totalwindowwest += y.Area
            }
          }
        }
      }
      for (let x of this.walldistinct) {
        let object = { wallname: x, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0, orientation: "" };
        for (let i of this.wallwindowdoormodellist) {
          if (i.data.Wall.WallName === x) {
            object.numinclusion++;
            object.totalarea += Number(i.data.Wall.Area);
            object.totalrvalue = Number(i.data.Wall.ConstructionRValue);
            object.totalheatloss += Number(i.data.Wall.Area) / Number(i.data.Wall.ConstructionRValue);
            object.orientation = i.data.Wall.Orientation;
          }
        }
        this.walllist.push(object);
        object = { wallname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0, orientation: "" };
      }


      for (let i of this.windowdistinct) {
        let object = { windowname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0, owa: 0 };
        for (let x of this.wallwindowdoormodellist) {
          for (let e of x.data.Window) {
            if (e.WindowName === i) {
              object.numinclusion++;
              object.totalarea += Number(e.Area);
              object.totalrvalue = Number(e.ConstructionRValue);
              object.totalheatloss += Number(e.Area) / Number(e.ConstructionRValue);
              object.owa = Number(e.OWA);
            }
          }
        }
        this.windowlist.push(object);
        object = { windowname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0, owa: 0 };
      }
    });


    this.buildingmodelservice.fetchroofskylightmodelGet(this.designid).subscribe(res => {
      this.roofskylightmodellist = res;
      this.roofdistinct = Array.from(new Set(this.roofskylightmodellist.map((x: any) => x.data.Roof.RoofName)));
      for (let i of this.roofskylightmodellist) {
        if (i.data.Skylight.length !== 0) {
          this.skylightdistinct = Array.from(new Set(i.data.Skylight.map((x: any) =>
            x.SkylightsName
          )));
        }
      }
      for (let i of this.roofdistinct) {
        let object = { roofname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
        for (let x of this.roofskylightmodellist) {
          if (x.data.Roof.RoofName === i) {
            object.numinclusion++;
            object.totalarea += Number(x.data.Roof.ExposedArea);
            object.totalrvalue = Number(x.data.Roof.ConstructionRValue);
            object.totalheatloss += Number(x.data.Roof.ExposedArea) / Number(x.data.Roof.ConstructionRValue);
          }
        }
        this.rooflist.push(object);
        object = { roofname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      }



      for (let i of this.skylightdistinct) {
        let object = { skylightname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
        for (let x of this.roofskylightmodellist) {
          for (let e of x.data.Skylight) {
            if (e.SkylightsName === i) {
              object.numinclusion++;
              object.totalarea += Number(e.Area);
              object.totalrvalue = Number(e.ConstructionRValue);
              object.totalheatloss += Number(e.Area) / Number(e.ConstructionRValue);
            }
          }
        }
        this.skylightlist.push(object);
        object = { skylightname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      }

    });

    this.buildingmodelservice.fetchfloormodel(this.designid).subscribe(res => {
      this.floormodellist = res;
      this.floordistinct = Array.from(new Set(this.floormodellist.map((x: any) => x.data.Floor.FloorName)));
      for (let x of this.floordistinct) {
        let object = { floorname: x, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
        for (let i of this.floormodellist) {
          if (i.data.Floor.FloorName === x) {
            object.numinclusion++;
            object.totalarea += Number(i.data.Floor.ExposedArea);
            object.totalrvalue = Number(i.data.Floor.ConstructionRValue);
            object.totalheatloss += Number(i.data.Floor.ExposedArea) / Number(i.data.Floor.ConstructionRValue);
          }
        }
        this.floorlist.push(object);
        object = { floorname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      }

    });

    setTimeout(() => {
      this.finalcalculation();
    }, 1000);

    
  }

  

  returntoSchedule() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }

  finalcalculation(){
    for (var x of this.walllist) {
      this.totalareawall += x.totalarea;
      this.totalheatlosswall += x.totalheatloss;
    }

    for (var x of this.windowlist) {
      this.totalareawindow += x.totalarea;
      this.totalheatlosswindow += x.totalheatloss;
      if (x.owa < 0.30) {
        this.totalareawindowless30 += x.totalarea;
        this.totalheatlosswindowless30 += x.totalheatloss;
      } else {
        this.totalareawindowmore30 += x.totalarea;
        this.totalheatlosswindowmore30 += x.totalheatloss;
      }
    }

    for (var x of this.rooflist) {
      this.totalarearoof += x.totalarea;
      this.totalheatlossroof += x.totalheatloss;
    }

    for (var x of this.skylightlist) {
      this.totalareaskylight += x.totalarea;
      this.totalheatlossskylight += x.totalheatloss;
    }

    for (var x of this.floorlist) {
      this.totalareafloor += x.totalarea;
      this.totalheatlossfloor += x.totalheatloss;
    }


    this.totalproposed = this.totalheatlossroof + this.totalheatlossskylight + this.totalheatlosswindow + this.totalheatlosswall + this.totalheatlossfloor;
    this.totalschedule = (this.totalarearoof / this.roofrvalue) + (this.totalareaskylight / this.skylightrvalue) + (this.totalareawall / this.wallrvalue) + (this.totalareawindowless30 / this.windowrvalue) + (this.totalareawindowmore30 / this.windowrvalue) + (this.totalareafloor / this.floorrvalue);
  }

  downloadresult(){
    // let doc = new jsPDF();
    // let specialElementHandler  = {
    //   "#result": function(element, renderer){
    //     return true;
    //   }
    // };

    //let content = this.content.nativeElement;
    // console.log(content);

    // doc.fromHTML(content.innerHTML, 10, 10, {
    //   'width': 200,
    //   'elementHandlers': specialElementHandler
    // }, (e) =>{
    //   doc.save("test.pdf")
    // });
    return xepOnline.Formatter.Format('content', {render: 'download'});
  }
}
