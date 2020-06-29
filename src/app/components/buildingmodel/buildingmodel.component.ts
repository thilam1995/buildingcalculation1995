import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buildingmodel',
  templateUrl: './buildingmodel.component.html',
  styleUrls: ['./buildingmodel.component.css']
})
export class BuildingmodelComponent implements OnInit {


  @Input() numberofstep: number;
  @Output() childnum = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  childGetnumber(num: number){
    this.childnum.emit(num);
  }

}
