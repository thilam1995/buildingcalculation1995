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
    } else {
      this.wallrvalue = this.statedata.project.Location.ConstructionRValue.Wall;
      this.windowrvalue = this.statedata.project.Location.ConstructionRValue.Window;
      this.roofrvalue = this.statedata.project.Location.ConstructionRValue.Roof;
      this.floorrvalue = this.statedata.project.Location.ConstructionRValue.Floor;
      this.skylightrvalue = this.statedata.project.Location.ConstructionRValue.Skylights;
      this.startcalculate();
    }

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
      if (i.window.length !== 0) {
        this.windowdistinct = Array.from(new Set(i.window.map((x: any) =>
          x.WindowName
        )));
      }
    }

    console.log(this.windowdistinct);
    for (let i of this.windowdistinct) {
      let object = { windowname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0, owa: 0 };
      for (let x of this.statedata.wallwindowdoormodel) {
        for (let e of x.window) {
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

    for (let i of this.statedata.wallwindowdoormodel) {
      if (i.door !== null) {
        this.doornamelist.push(i.door.DoorName);
      }
    }

    this.doordistinct = Array.from(new Set(this.doornamelist.map((x: any) =>
      x
    )));


    console.log(this.doordistinct);

    for (let i of this.doordistinct) {
      if (i !== null || i !== undefined) {
        let object = { doorname: i, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
        for (let x of this.statedata.wallwindowdoormodel) {
          if (x.door !== null && x.door.DoorName === i) {
            if (x.door.DoorName !== null) {
              object.numinclusion++;
              object.totalarea += Number(x.door.Area);
              object.totalrvalue = Number(x.door.ConstructionRValue);
              object.totalheatloss += Number(x.door.Area) / Number(x.door.ConstructionRValue);
            }
          }
        }
        this.doorlist.push(object);
        object = { doorname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      }
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
      if (i.skylight.length !== 0) {
        this.skylightdistinct = Array.from(new Set(i.skylight.map((x: any) =>
          x.SkylightsName
        )));
      }
    }
    console.log(this.skylightdistinct);

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
    for (let x of this.floordistinct) {
      let object = { floorname: x, numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
      for (let i of this.statedata.floormodel) {
        if (i.floor.FloorName === x) {
          object.numinclusion++;
          object.totalarea += Number(i.floor.ExposedArea);
          object.totalrvalue = Number(i.floor.ConstructionRValue);
          object.totalheatloss += Number(i.floor.ExposedArea) / Number(i.floor.ConstructionRValue);
        }
      }
      this.floorlist.push(object);
      object = { floorname: "", numinclusion: 0, totalarea: 0, totalrvalue: 0, totalheatloss: 0 };
    }
    this.heatlossresult();
  }

  heatlossresult() {
    if (this.rooflist.length > 0) {
      for (let i of this.rooflist) {
        this.totalarearoof += i.totalarea;
        this.totalheatlossroof += i.totalheatloss;
        this.totalheatlossroof1 += i.totalarea / this.roofrvalue;
      }
    }

    if (this.skylightlist.length > 0) {
      for (let i of this.skylightlist) {
        this.totalareaskylight += i.totalarea;
        this.totalheatlossskylight += i.totalheatloss;
        this.totalheatlossskylight1 += i.totalarea / this.skylightrvalue;
      }
    }

    if (this.walllist.length > 0) {
      for (let i of this.walllist) {
        this.totalareawall += i.totalarea;
        this.totalheatlosswall += i.totalheatloss;
        this.totalheatlosswall1 += i.totalarea / this.wallrvalue;
      }
    }

    if (this.windowlist.length > 0) {
      for (let i of this.windowlist) {
        this.totalareawindow += i.totalarea;
        this.totalheatlosswindow += i.totalheatloss;
        if(i.owa < 0.30){
          this.totalareawindowless30 += i.totalarea;
          this.totalheatlosswindow1less30 += i.totalarea/this.windowrvalue;
        }else if(i.owa > 30){
          this.totalareawindowless30 += i.totalarea;
          this.totalheatlosswindow1more30 += i.totalarea/this.windowrvalue;
        }

      }
    }

    if (this.doorlist.length > 0) {
      for (let i of this.doorlist) {
        this.totalareadoor += i.totalarea;
        this.totalheatlossdoor += i.totalheatloss;
        this.totalheatlossdoor1 += i.totalarea / this.wallrvalue;
      }
    }

    if (this.floorlist.length > 0) {
      for (let i of this.floorlist) {
        this.totalareafloor += i.totalarea;
        this.totalheatlossfloor += i.totalheatloss;
        this.totalheatlossfloor1 += i.totalarea / this.floorrvalue;
      }
    }

    this.totalproposed = this.totalheatlossroof + this.totalheatlossskylight + this.totalheatlosswall + this.totalheatlosswindow + this.totalareadoor +
    this.totalheatlossfloor;

    this.totalschedule = this.totalheatlossroof1 + this.totalheatlossskylight1 + this.totalheatlosswall1 + this.totalheatlosswindow1less30 +
    this.totalheatlosswindow1more30  + this.totalheatlossfloor1;
  }

}
