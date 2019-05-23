import { Component, OnInit, Input } from '@angular/core';
import { Buildinginfo } from 'src/app/models/buildinginfo';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClimateService } from 'src/app/service/climate.service';

@Component({
  selector: 'app-buildinginfo',
  templateUrl: './buildinginfo.component.html',
  styleUrls: ['./buildinginfo.component.css']
})
export class BuildinginfoComponent implements OnInit {

  buildinginfoobject: Buildinginfo;

  locationselected: any;

  locations = [];
  constructor(private locationService: LocationService, 
    public router: Router, private climateservice: ClimateService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.setdefault();
    this.climateservice.getallclimate();

  }



  selected1(index) {
    //console.log(this.buildinginfoobject.Location);
    if(index !== null){
      this.locationselected = this.buildinginfoobject.TargetRating;
    }
    
  }

  setdefault() {
    this.buildinginfoobject = {
      ID: null,
      CompletedBy: null,
      DrawingSet: null,
      FloorArea: null,
      Location: null,
      NumofHabitationroom: null,
      TargetRating: null,
      Typology: null,
    };
    //this.buildinginfoobject.TargetRating.ClimateZoneList = [];
  }

  onSubmit() {
    if(this.buildinginfoobject.ID === null){
      alert("Please Enter Your Project!");
    }else{
      this.router.navigate(['buildingschedule'], { state: { data: this.buildinginfoobject }});
    }

  }

}
