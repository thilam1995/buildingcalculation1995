import { Injectable } from '@angular/core';
import { WindowObject } from '../models/windowobject';
import { Wall } from '../models/wall';
import { Door } from '../models/door';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalldoorwindowService {


  windowlist = [];
  walllist = [];
  doorlist = [];

  windowobject: WindowObject;
  wallobject: Wall;
  doorobject: Door;

  constructor() { }

  windowlistdata() {

  }

  walllistdata() {

  }

  doorlistdata() {

  }

  doorposting(){

  }

  wallposting(){

  }

  windowposting(){

  }

  doorput(){

  }

  wallput(){

  }

  windowput(){

  }

  doordelete(){

  }

  walldelete(){

  }

  windowdelete(){

  }

}
