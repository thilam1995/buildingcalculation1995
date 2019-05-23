import { Component, OnInit } from '@angular/core';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { LocationService } from 'src/app/service/location.service';
import { ClimateService } from 'src/app/service/climate.service';
import { BuildinginfoserviceService } from 'src/app/service/buildinginfoservice.service';
import { Buildinginfo } from 'src/app/models/buildinginfo';
import { Door } from 'src/app/models/door';
import { WindowObject } from 'src/app/models/windowobject';
import { Wall } from 'src/app/models/wall';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';
import { Floors } from 'src/app/models/floors';
import { NullAstVisitor } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buildingschedule',
  templateUrl: './buildingschedule.component.html',
  styleUrls: ['./buildingschedule.component.css']
})
export class BuildingscheduleComponent implements OnInit {

  state$: Observable<object>;
  stateobject:any = {
    ID: null,
    CompletedBy: null,
    DrawingSet: null,
    FloorArea: null,
    Location: null,
    NumofHabitationroom: null,
    TargetRating: null,
    Typology: null
  };

  dataobject: any;

  doorobject: Door;
  windowobject: WindowObject;
  wallobject: Wall;
  skylightsobject: Skylights;
  roofobject: Roof;
  floorobject: Floors;

  buildingscheduleproposed = {};
  wallwindowdoorobject = {};
  roofskylightobject = {};
  floorsobject = {};

  doorobjectlist: Door[] = [];
  windowobjectlist: WindowObject[] = [];
  wallobjectlist: Wall[] = [];
  skylightsobjectlist: Skylights[] = [];
  roofobjectlist: Roof[] = [];
  floorobjectlist: Floors[] = [];
  wallwindowdoorobjectlist = [];
  fieldarrayfloor: Array<any> = [];
  roofskylightobjectlist = [];

  constructor(private walldoorwindowserv: WalldoorwindowService,
    private locationservice: LocationService,
    private climateservice: ClimateService,
    private buildinginfoserviceService: BuildinginfoserviceService,
    public activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.setnulldefault();
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.data
      ));
    this.state$.subscribe(x => {
      this.stateobject = x;
    });
    console.log(this.stateobject);
    if (this.stateobject === undefined || this.stateobject.ID === undefined) {
      this.router.navigateByUrl('project');
    }
  }

  setnulldefault() {
    this.stateobject = {
      ID: null,
      CompletedBy: null,
      DrawingSet: null,
      FloorArea: null,
      Location: null,
      NumofHabitationroom: null,
      TargetRating: null,
      Typology: null
    };
    this.doorobject = {
      DoorName: null,
      Area: null,
      ConstructionRValue: null,
      Height: null,
      Width: null
    };

    this.wallobject = {
      WallName: null,
      ConstructionRValue: null,
      Description: null,
      Area: null,
      Height: null,
      Width: null
    };

    this.windowobject = {
      WindowName: null,
      ConstructionRValue: null,
      Width: null,
      Height: null,
      Area: null,
      ID: null,
      OWA: null, WindowHeatLoss: null,
      ShadePercent: 0
    };

    this.skylightsobject = {
      Area: null,
      ConstructionRValue: null,
      Length: null,
      SkylightsName: null,
      Width: null,
      HeatLoss: null
    };

    this.roofobject = {
      RoofSection: null,
      Description: null,
      ConstructionRValue: null,
      RoofName: null
    };

    this.floorobject = {
      FloorSection: null,
      FloorName: null,
      ConstructionRValue: null,
      Description: null,
      ExposedArea: null
    }
  }

  submiteproject() {
    console.log(this.doorobject);
    console.log(this.wallobject);
    console.log(this.windowobject);
    console.log(this.doorobjectlist);
    console.log(this.windowobjectlist);
    console.log(this.wallobjectlist);

  }

  getcalculate() {
    this.dataobject = {
      project: this.stateobject,
      wallwindowdoormodel: this.wallwindowdoorobjectlist,
      roofskylightmodel: this.roofobjectlist,
      floormodel: this.fieldarrayfloor
    };
    if (this.dataobject.wallwindowdoormodel.length === 0 && this.dataobject.roofskylightmodel.length === 0
      && this.dataobject.floormodel.length === 0) {
      this.toastr.warning("Please complete the building model before calculate!", "Building Schedule Message");
    } else {
      this.router.navigateByUrl('ehc1heatingenergy', { state: { data: this.dataobject } });
    }

  }
}
