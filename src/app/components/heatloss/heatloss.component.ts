import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heatloss',
  templateUrl: './heatloss.component.html',
  styleUrls: ['./heatloss.component.css']
})
export class HeatlossComponent implements OnInit {

  @Input() i;
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
    console.log(this.i);
    this.calculate();
  }

  calculate() {
    this.grosswallarea = this.i.data.Wall.Area;
    for (let i of this.i.data.Window) {
      this.grosswindowarea += Number(i.Area);
    }
    for (let i of this.i.data.Window) {
      this.grossowa += Number(i.OWA) * Number(i.Area);
    }
    this.netwallarea = this.grosswallarea - this.grosswindowarea;
    this.wallconstructionrvalue = Number(this.i.data.Wall.ConstructionRValue);
    this.wallheatloss = this.netwallarea / this.wallconstructionrvalue;
    // this.wallwindowdoori.window.array.forEach(element => {
    //   element.WindowHeatLoss = element.Area/element.ConstructionRValue;
    // });

    for (let i of this.i.data.Window) {
      this.windowheatloss += Number(i.Area / i.ConstructionRValue);
    }
  }


}
