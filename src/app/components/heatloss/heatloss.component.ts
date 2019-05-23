import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heatloss',
  templateUrl: './heatloss.component.html',
  styleUrls: ['./heatloss.component.css']
})
export class HeatlossComponent implements OnInit {

  @Input() wallwindowdoori;
  grosswallarea = 0;
  grosswindowarea = 0;
  grossowa = 0;
  netwallarea = 0;
  wallconstructionrvalue = 0;
  wallheatloss = 0;
  windowheatloss = 0;
  windowheatlosslist = [];

  constructor() { }

  ngOnInit() {
    console.log(this.wallwindowdoori);
    this.calculate();
  }

  calculate() {
    this.grosswallarea = this.wallwindowdoori.wall.Area;
    for (let i of this.wallwindowdoori.window) {
      this.grosswindowarea += Number.parseFloat(i.Area);
    }
    for (let i of this.wallwindowdoori.window) {
      this.grossowa += Number.parseFloat(i.OWA);
    }
    // this.wallwindowdoori.window.forEach(element => {
    //   this.grosswindowarea += element.Area;
    // });
    // this.wallwindowdoori.window.forEach(element => {
    //   this.grossowa += element.OWA;
    // });
    this.netwallarea = this.grosswallarea - this.grosswindowarea;
    this.wallconstructionrvalue = Number.parseFloat(this.wallwindowdoori.wall.ConstructionRValue);
    this.wallheatloss = this.netwallarea / this.wallconstructionrvalue;
    // this.wallwindowdoori.window.array.forEach(element => {
    //   element.WindowHeatLoss = element.Area/element.ConstructionRValue;
    // });
    for (let i of this.wallwindowdoori.window) {
      i.WindowHeatLoss += Number.parseFloat(i.Area)/Number.parseFloat(i.ConstructionRValue);
    }
    for (let i of this.wallwindowdoori.window) {
      this.windowheatloss += Number.parseFloat(i.WindowHeatLoss);
    }
  }

}
