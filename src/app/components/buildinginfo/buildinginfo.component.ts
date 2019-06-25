import { Component, OnInit, Input, Inject } from '@angular/core';
import { Buildinginfo } from 'src/app/models/buildinginfo';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClimateService } from 'src/app/service/climate.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { LoginserviceService } from 'src/app/service/loginservice.service';

@Component({
  selector: 'app-buildinginfo',
  templateUrl: './buildinginfo.component.html',
  styleUrls: ['./buildinginfo.component.css']
})
export class BuildinginfoComponent implements OnInit {

  buildinginfoobject: Buildinginfo = null;

  Projectname: string = '';
  TargetRating: any = null;
  Location: any = null;
  CompletedBy: string = '';
  DrawingSet: string = '';
  Typology: string = '';
  FloorArea: number = null;
  NumofHabitationroom: number = null;

  locationselected: any;

  constructor(private locationService: LocationService,
    private router: Router, private climateservice: ClimateService,
    private route: ActivatedRoute, private loginservice: LoginserviceService, private localSt: LocalStorageService ) {
  }

  ngOnInit() {
    this.setdefault();
    this.climateservice.getallclimate();
    this.locationService.getallLocation();
    // if(this.localSt.retrieve('buildinginfo') !== undefined || this.localSt.retrieve('buildinginfo') !== null){
    //   this.buildinginfoobject = this.localSt.retrieve('buildinginfo');
    // }
  }



  selected1() {
    //console.log(this.buildinginfoobject.Location);
    this.localSt.store('targetrating', this.TargetRating);
    console.log(this.localSt.retrieve('targetrating'));
  }

  setdefault() {
    this.Projectname = '';
    this.TargetRating = null;
    this.Location = null;
    this.CompletedBy = '';
    this.DrawingSet = '';
    this.Typology = '';
    this.FloorArea = null;
    this.NumofHabitationroom = null;
    this.buildinginfoobject = {
      ProjectName: '',
      CompletedBy: '',
      DrawingSet: '',
      FloorArea: null,
      Location: null,
      NumofHabitationroom: null,
      TargetRating: null,
      Typology: '',
    };
  }

  onSubmit() {
    this.buildinginfoobject = {
      ProjectName: this.Projectname,
      CompletedBy: this.CompletedBy,
      DrawingSet: this.DrawingSet,
      FloorArea: this.FloorArea,
      Location: this.Location,
      NumofHabitationroom: this.NumofHabitationroom,
      TargetRating: this.TargetRating,
      Typology: this.Typology,
    };

    if (this.buildinginfoobject.ProjectName === null || this.buildinginfoobject.TargetRating === null ||
      this.buildinginfoobject.Location === null) {
      alert("Please Enter Your Project!");
    } else {
      // this.localSt.store('buildinginfo', this.buildinginfoobject);
      // this.router.navigate(['buildingschedule'] ,{ state: { data: this.localSt.retrieve('buildinginfo') }});
    }

  }

}
