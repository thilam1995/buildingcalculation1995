import { Component, OnInit } from '@angular/core';
import { BuildinginfoserviceService } from 'src/app/service/buildinginfoservice.service';

@Component({
  selector: 'app-buildingschedulelist',
  templateUrl: './buildingschedulelist.component.html',
  styleUrls: ['./buildingschedulelist.component.css']
})
export class BuildingschedulelistComponent implements OnInit {

  buildingschedulelist = [];
  constructor(private buildingservice: BuildinginfoserviceService) { }

  ngOnInit() {
    this.buildingschedulelist = this.buildingservice.buildinginfolistdata();
  }

}
