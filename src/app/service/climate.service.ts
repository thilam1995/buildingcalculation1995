import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimateService {

  homestarUrl = 'assets/jsondata/homestar.json';
  climatetypeUrl = 'assets/jsondata/climatezonetype.json';

  //url: string = "http://localhost:8080/api/targetrating";
  homestarlist = [];
  climatelist = [];
  constructor(private http: HttpClient) { 
  }

  getallhomestarlist(){
    this.http.get(this.homestarUrl).pipe(map((data: any)=>{
      return data as any;
    })).toPromise().then(x =>{
      this.homestarlist = x.Homestars;
      this.homestarlist.sort((a: any, b: any) =>{
        return (a.HomeStar > b.HomeStar) ? 1 : ((b.HomeStar > a.HomeStar) ? -1 : 0)
      });
    });
  }

  getclimatelist(){
    this.http.get(this.climatetypeUrl).pipe(map((data: any)=>{
      return data as any;
    })).toPromise().then(x =>{
      this.climatelist = x.climatezonetypes;
    });
  }


  // getallclimate(){
  //   this.http.get(this.url).pipe(map((data: Response)=>{
  //     return data as any;
  //   })).toPromise().then(
  //     x =>{
  //       this.targetratinglist = x;
  //     }
  //   );

  // }
}
