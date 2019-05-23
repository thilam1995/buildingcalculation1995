import { Injectable } from '@angular/core';
import { Buildinginfo } from '../models/buildinginfo';

@Injectable({
  providedIn: 'root'
})
export class BuildinginfoserviceService {

  buildinginfolist = [];
  buildinginfoobject: Buildinginfo;
  constructor() { }

  buildinginfolistdata(){
    return [
      {
        ID: "Sam's House",
        TargetRating: "",
        CompletedBy: "Sam",
        DrawingSet: "Random",
        Typology: "Random",
        NumofHabitationroom: 8,
        FloorArea: "North",
        Location_ID: "",
        Climatecategory: "",
        DateCreated: "28/04/2019",
        DateModified: "28/04/2019",
        Door:{},
        Window:[],
        Wall:{}
      },
      {
        ID: "Big Apartment",
        TargetRating: "",
        CompletedBy: "James",
        DrawingSet: "James",
        Typology: "",
        NumofHabitationroom: 9,
        FloorArea: "",
        Location_ID: "",
        Climatecategory: "",
        DateCreated: "",
        DateModified: "",
        Door:{},
        Window:[],
        Wall:{}
      }
    ];
  }

  add(buidlingobject: any){
    this.buildinginfolist.push(buidlingobject);
  }
}
