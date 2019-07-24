import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { NgFormSelectorWarning } from '@angular/forms';

@Component({
  selector: 'app-heatlossfloor',
  templateUrl: './heatlossfloor.component.html',
  styleUrls: ['./heatlossfloor.component.css']
})
export class HeatlossfloorComponent implements OnInit {

  @Input() i: any;
  floorarea: number = 0;
  floorconstructionrvalue: number = 0;
  floorheatloss: number = 0;

  constructor() { }

  ngOnInit() {
    this.calculate();
  }

  calculate(){
    this.floorarea = Number.parseFloat(this.i.data.Floor.ExposedArea);
    this.floorconstructionrvalue = Number.parseFloat(this.i.data.Floor.ConstructionRValue);
    this.floorheatloss = this.floorarea / this.floorconstructionrvalue;
  }

}
