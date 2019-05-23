import { Component, OnInit, Input } from '@angular/core';
import { Floors } from 'src/app/models/floors';
import { NgFormSelectorWarning } from '@angular/forms';

@Component({
  selector: 'app-heatlossfloor',
  templateUrl: './heatlossfloor.component.html',
  styleUrls: ['./heatlossfloor.component.css']
})
export class HeatlossfloorComponent implements OnInit {

  @Input() floori: any;
  floorarea: number = 0;
  floorconstructionrvalue: number = 0;
  floorheatloss: number = 0;

  constructor() { }

  ngOnInit() {
    console.log(this.floori);
    this.calculate();
  }

  calculate(){
    this.floorarea = Number.parseFloat(this.floori.floor.ExposedArea);
    this.floorconstructionrvalue = Number.parseFloat(this.floori.floor.ConstructionRValue);
    this.floorheatloss = this.floorarea / this.floorconstructionrvalue;
  }

}
