import { Injectable } from '@angular/core';
import { Floors } from '../models/floors';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  Floor: Floors;

  Floorlist = [];

  constructor() { }
}
