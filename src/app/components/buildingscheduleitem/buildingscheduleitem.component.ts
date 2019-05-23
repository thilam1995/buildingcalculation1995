import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-buildingscheduleitem',
  templateUrl: './buildingscheduleitem.component.html',
  styleUrls: ['./buildingscheduleitem.component.css']
})
export class BuildingscheduleitemComponent implements OnInit {

  @Input() build: any;
  constructor() { }

  ngOnInit() {
  }

}
