import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-ehc1heatingenergy',
  templateUrl: './ehc1heatingenergy.component.html',
  styleUrls: ['./ehc1heatingenergy.component.css']
})
export class Ehc1heatingenergyComponent implements OnInit {


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

  totalheatlosswall1: number = 0;
  totalheatlosswindow1less30: number = 0;
  totalheatlosswindow1more30: number = 0;
  totalheatlossdoor1: number = 0;
  totalheatlossroof1: number = 0;
  totalheatlossskylight1: number = 0;
  totalheatlossfloor1: number = 0;
  totalschedule: number = 0;

  rooflist = [];
  skylightlist = [];
  walllist = [];
  floorlist = [];
  windowlist = [];
  doorlist = [];

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
        if(x === null){
          this.registeruser = loginapp;
        }else{
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
      console.log(this.designobject);
      this.location = this.designobject.Location.data.place;
      this.targeting = this.designobject.TargetRating.data.Type;
      this.climatezone = this.designobject.Location.data.climatezone;
      this.targetingschedule = this.designobject.TargetRating.data.ClimatezoneList.find(x => x.climatezone === this.climatezone);
      this.schedulemethod = this.designobject.TargetRating.data.ClimatezoneList;
      this.skylightrvalue = this.targetingschedule.constructionrvalue.Skylight;
      this.roofrvalue = this.targetingschedule.constructionrvalue.Roof;
      this.wallrvalue = this.targetingschedule.constructionrvalue.Wall;
      this.floorrvalue = this.targetingschedule.constructionrvalue.Floor;
      this.windowrvalue = this.targetingschedule.constructionrvalue.Skylight;
      console.log(this.targetingschedule);
    }, err => {
      this.toastr.error("Something wrong!", "Error Message");
    });
    this.startcalculate();
  }

  startcalculate() {
    this.buildingmodelservice.fetchwallwindowdoormodel(this.designid).subscribe(res => {
      this.wallwindowdoormodellist = res;
      console.log(this.wallwindowdoormodellist);
      this.walldistinct = Array.from(new Set(this.wallwindowdoormodellist.map((x: any) => x.data.Wall.WallName)));
      console.log(this.walldistinct);
      for (let i of this.wallwindowdoormodellist) {
        if (i.data.Window.length !== 0) {
          this.windowdistinct = Array.from(new Set(i.data.Window.map((x: any) =>
            x.WindowName
          )));
        }
      }
      console.log(this.windowdistinct);
      for (let i of this.wallwindowdoormodellist) {
        if (i.data.Door !== null) {
          this.doornamelist.push(i.data.Door.DoorName);
        }
      }
      this.doordistinct = Array.from(new Set(this.doornamelist.map((x: any) =>
        x
      )));
      console.log(this.doordistinct);

      for (let x of this.walldistinct) {
        let object = { wallname: x, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
        for (let i of this.wallwindowdoormodellist) {
          if (i.data.Wall.WallName === x) {
            object.numinclusion++;
            object.totalarea += Number(i.data.Wall.Area);
            object.totalrvalue = Number(i.data.Wall.ConstructionRValue);
            object.totalheatloss += Number(i.data.Wall.Area) / Number(i.data.Wall.ConstructionRValue);
          }
        }
        this.walllist.push(object);
        object = { wallname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
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
      console.log(this.roofskylightmodellist);
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
      console.log(this.floormodellist);
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
  }

  calculatefinal(...housecomponentlist: Array<any>){

  }


  returntoSchedule() {
    this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
  }
}
