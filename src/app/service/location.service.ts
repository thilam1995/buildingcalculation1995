import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getallLocation(){
    return [
      {location: "Cimate zone 1", climatezone: "Climate Zone 1"},
      {location: "Climate Zone 2", climatezone: "Climate Zone 2"},
      {location: "Climate Zone 3a", climatezone: "Climate Zone 3a"},
      {location: "Climate Zone 3b", climatezone: "Climate Zone 3b"}
    ];
  }
}
