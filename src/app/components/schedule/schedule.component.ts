import { Component, OnInit, Input } from '@angular/core';
import { Door } from 'src/app/models/door';
import { Wall } from 'src/app/models/wall';
import { WindowObject } from 'src/app/models/windowobject';
import { Skylights } from 'src/app/models/skylights';
import { Roof } from 'src/app/models/roof';
import { Floors } from 'src/app/models/floors';
import { LocalStorage } from 'ngx-webstorage';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() doorobject: Door;
  @Input() wallobject: Wall;
  @Input() windowobject: WindowObject;
  @Input() skylightsobject: Skylights;
  @Input() roofobject: Roof;
  @Input() floorobject: Floors;

  @Input() windowobjectlist: WindowObject[];
  @Input() wallobjectlist: Wall[];
  @Input() doorobjectlist: Door[];
  @Input() skylightsobjectlist: Skylights[];
  @Input() roofobjectlist: Roof[];
  @Input() floorobjectlist: Floors[];

  constructor() { }

  ngOnInit() {
  }

}
