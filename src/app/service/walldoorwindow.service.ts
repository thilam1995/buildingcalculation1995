import { Injectable } from '@angular/core';
import { WindowObject } from '../models/windowobject';
import { Wall } from '../models/wall';
import { Door } from '../models/door';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalldoorwindowService {

  windowlist: WindowObject[];
  walllist: Wall[];
  doorlist: Door[];

  windowobject: WindowObject;
  wallobject: Wall;
  doorobject: Door;

  constructor() { }

  windowlistdata() {
    return [{

    },
    {

    }];
  }

  walllistdata() {
    return [{

    },
    {

    }];
  }

  doorlistdata() {
    return [{

    },
    {

    }];
  }
}
