import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Roof } from 'src/app/models/roof';

@Component({
  selector: 'app-ehc1heatingenergy',
  templateUrl: './ehc1heatingenergy.component.html',
  styleUrls: ['./ehc1heatingenergy.component.css']
})
export class Ehc1heatingenergyComponent implements OnInit {

  state$: Observable<object>;
  statedata: any;

  roofrvalue:number = 0;
  wallrvalue:number = 0;
  windowrvalue:number = 0;
  floorrvalue: number = 0;
  skylightrvalue:number = 0;


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



  constructor(public activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.data
      ));
    this.state$.subscribe(x => {
      this.statedata = x;
    });

    if (this.statedata === undefined) {
      this.router.navigateByUrl('project');
    }
    console.log(this.statedata.Location.ConstructionRValue);
    this.wallrvalue = this.statedata.Location.ConstructionRValue.Wall;
    this.windowrvalue = this.statedata.Location.ConstructionRValue.Window;
    this.roofrvalue = this.statedata.Location.ConstructionRValue.Roof;
    this.floorrvalue = this.statedata.Location.ConstructionRValue.Floor;
    this.skylightrvalue = this.statedata.Location.ConstructionRValue.Skylights;
    this.startcalculate();
  }

  startcalculate() {

    this.walldistinct = Array.from(new Set(this.statedata.wallwindowdoormodel.map((x: any) => x.wall.WallName)));
    for (let x of this.walldistinct) {
      let object = { wallname: x, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      for (let i of this.statedata.wallwindowdoormodel) {
        if (i.wall.WallName === x) {
          object.numinclusion++;
          object.totalarea += Number(i.wall.Area);
          object.totalrvalue = Number(i.wall.ConstructionRValue);
          object.totalheatloss += Number(i.wall.Area) / Number(i.wall.ConstructionRValue);
        }
      }
      this.walllist.push(object);
      object = { wallname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
    }

    for (let i of this.statedata.wallwindowdoormodel) {
      this.windowdistinct = Array.from(new Set(i.window.map((x: any) =>
        x.WindowName
      )));
    }

    console.log(this.windowdistinct);
    for (let i of this.windowdistinct) {
      let object = { windowname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      for (let x of this.statedata.wallwindowdoormodel) {
        for (let e of x.window) {
          if (e.WindowName === i) {
            object.numinclusion++;
            object.totalarea += Number(e.Area);
            object.totalrvalue = Number(e.ConstructionRValue);
            object.totalheatloss += Number(e.Area) / Number(e.ConstructionRValue);
          }
        }
      }
      this.windowlist.push(object);
      object = { windowname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
    }

    this.doordistinct = Array.from(new Set(this.statedata.wallwindowdoormodel.map((x: any) => x.door.DoorName)));
    for (let i of this.doordistinct) {
      let object = { doorname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      for (let x of this.statedata.wallwindowdoormodel) {
        if (x.door.DoorName === i) {
          object.numinclusion++;
          object.totalarea += Number(x.door.Area);
          object.totalrvalue = Number(x.door.ConstructionRValue);
          object.totalheatloss += Number(x.door.Area) / Number(x.door.ConstructionRValue);
        }
      }
      this.doorlist.push(object);
      object = { doorname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
    }

    this.roofdistinct = Array.from(new Set(this.statedata.roofskylightmodel.map((x: any) => x.roof.RoofName)));
    for (let i of this.roofdistinct) {
      let object = { roofname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      for (let x of this.statedata.roofskylightmodel) {
        if (x.roof.RoofName === i) {
          object.numinclusion++;
          object.totalarea += Number(x.roof.ExposedArea);
          object.totalrvalue = Number(x.roof.ConstructionRValue);
          object.totalheatloss += Number(x.roof.ExposedArea) / Number(x.roof.ConstructionRValue);
        }
      }
      this.rooflist.push(object);
      object = { roofname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
    }

    for (let i of this.statedata.roofskylightmodel) {
      this.skylightdistinct = Array.from(new Set(i.skylight.map((x: any) =>
        x.SkylightsName
      )));
    }

    for (let i of this.skylightdistinct) {
      let object = { skylightname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      for (let x of this.statedata.roofskylightmodel) {
        for (let e of x.skylight) {
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

    this.floordistinct = Array.from(new Set(this.statedata.floormodel.map((x: any) => x.floor.FloorName)));
    for(let x of this.floordistinct){
      let object = { floorname: x, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      for(let i of this.statedata.floormodel){
        if(i.floor.FloorName === x){
          object.numinclusion++;
          object.totalarea += Number(i.floor.ExposedArea);
          object.totalrvalue = Number(i.floor.ConstructionRValue);
          object.totalheatloss += Number(i.floor.ExposedArea) / Number(i.floor.ConstructionRValue);
        }
      }
      this.floorlist.push(object);
      object = { floorname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
    }
  }

}
