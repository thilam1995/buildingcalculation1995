import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coolingroomitem',
  templateUrl: './coolingroomitem.component.html',
  styleUrls: ['./coolingroomitem.component.css']
})
export class CoolingroomitemComponent implements OnInit {

  @Input()i: any;
  @Input()ind: any;

  netowa: number = 0;
  iscomplied: boolean = false;
  constructor() { }

  ngOnInit() {
    this.start_calculate();
  }
  
  start_calculate(){
    this.i.data.WindowList.forEach(e => {
      this.netowa += Number(Number(e.WindowID.OWA * e.WindowID.Area).toFixed(2));
    });
    this.iscomplied = (this.netowa/this.i.data.RoomArea) >= 0.05;

  }
}
