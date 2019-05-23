import { Component, OnInit, Input } from '@angular/core';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';

@Component({
  selector: 'app-heatlossroofskylight',
  templateUrl: './heatlossroofskylight.component.html',
  styleUrls: ['./heatlossroofskylight.component.css']
})
export class HeatlossroofskylightComponent implements OnInit {

  @Input() roofskylighti:any;
  grossroofarea = 0;
  grossskylightarea = 0;
  netroofarea = 0;
  roofconstructionr = 0;
  roofheatloss = 0;
  skylightheatloss = 0;
  constructor() { }

  ngOnInit() {
    console.log(this.roofskylighti);
    this.calculate();
  }

  calculate(){
    this.grossroofarea = Number.parseFloat(this.roofskylighti.roof.ExposedArea);
    for(let i of this.roofskylighti.skylight){
      this.grossskylightarea += Number.parseFloat(i.Area);
    }
    this.netroofarea = this.grossroofarea - this.grossskylightarea;
    this.roofconstructionr = Number.parseFloat(this.roofskylighti.roof.ConstructionRValue);
    this.roofheatloss = this.netroofarea / this.roofconstructionr;
    for(let i of this.roofskylighti.skylight){
      i.HeatLoss = Number.parseFloat(i.Area) / Number.parseFloat(i.ConstructionRValue);
    }
    for(let i of this.roofskylighti.skylight){
      this.skylightheatloss += i.HeatLoss;
    }
  }

}
