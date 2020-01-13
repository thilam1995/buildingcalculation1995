import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-naturallightingitem',
  templateUrl: './naturallightingitem.component.html',
  styleUrls: ['./naturallightingitem.component.css']
})
export class NaturallightingitemComponent implements OnInit {

  @Input()i: any;
  totalwindowarea: number = 0;
  naturallightrequire: number = 0;
  naturallightachieve: number = 0;
  isdisplay = false;

  numberofshaded: number = 0;
  numberofunshaded: number = 0;

  shadelevel: string = "";
  constructor() { }

  ngOnInit() {
    this.startcaculating();
  }

  startcaculating(){
    this.i.data.WindowList.forEach(e => {
      this.totalwindowarea += e.WindowID.Area;
      if(e.IsShading){
        ++this.numberofshaded;
      }else{
        ++this.numberofunshaded;
      }
    });

    this.shadelevel = (this.numberofshaded === this.i.data.WindowList.length && this.numberofshaded!== 0) 
    || (this.numberofshaded!== 0 && (this.numberofshaded >= this.numberofunshaded || this.numberofshaded <= this.numberofunshaded))
    ? "Shade" : "Unshaded";
    this.naturallightrequire = this.shadelevel === "Shade" ? 0.20 : 0.15;
    console.log(this.numberofshaded);
    console.log(this.numberofunshaded);
  }

}
