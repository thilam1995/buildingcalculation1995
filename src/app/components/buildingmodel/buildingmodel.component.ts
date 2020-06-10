import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buildingmodel',
  templateUrl: './buildingmodel.component.html',
  styleUrls: ['./buildingmodel.component.css']
})
export class BuildingmodelComponent implements OnInit {


  @Input() numberofhabitroom: number;
  constructor() { }

  ngOnInit() {
  }

}
