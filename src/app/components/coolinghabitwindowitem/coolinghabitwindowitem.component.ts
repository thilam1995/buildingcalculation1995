import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coolinghabitwindowitem',
  templateUrl: './coolinghabitwindowitem.component.html',
  styleUrls: ['./coolinghabitwindowitem.component.css']
})
export class CoolinghabitwindowitemComponent implements OnInit {

  @Input()i: any;
  windowsecurelist = [];
  issecure: boolean = false;
  constructor() { }

  ngOnInit() {
    if(this.i.data.WindowList.length !== 0){
      this.i.data.WindowList.forEach(e => {
        if(e.IsSafelysecure){
          this.windowsecurelist.push(e.IsSafelysecure);
        }
      });
    }

    if(this.windowsecurelist.length === 0){
      this.issecure = false;
    }else{
      this.issecure = this.windowsecurelist.every(Boolean);
    }

  }

}
