import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-heatloss',
  templateUrl: './heatloss.component.html',
  styleUrls: ['./heatloss.component.css']
})
export class HeatlossComponent implements OnInit {

  @Input() i;
  grosswallarea: number = 0;
  grosswindowarea: number = 0;
  grossdoorarea: number = 0;
  grosswindowdoorarea: number = 0;
  grossowa: number = 0;
  netwallarea: number = 0;
  wallconstructionrvalue: number = 0;
  wallheatloss: number = 0;
  windowheatloss: number = 0;
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


    if (this.i.data.hasOwnProperty("Door")) {
      if (this.i.data.Door.length !== 0) {
        this.i.data.Door.forEach(e => {
          console.log(e);
          this.grossdoorarea += Number(e.Area);
        });
      } else {
        this.grossdoorarea = 0;
      }

    }


    this.grosswindowdoorarea = this.grosswindowarea + this.grossdoorarea;

    for (let i of this.i.data.Window) {
      this.grossowa += Number(i.OWA) * Number(i.Area);
    }
    this.netwallarea = this.grosswallarea - this.grosswindowdoorarea;
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
