import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimateService {

  climateUrl = 'assets/jsondata/homestar.json';
  url: string = "http://localhost:8080/api/targetrating";
  targetratinglist = [];
  constructor(private http: HttpClient) { 
  }

  // getallclimatetolist(){
  //   this.getallclimate().subscribe(data =>{
  //     this.climatelist = data.HomeStarRating;
  //   });
  // }

  // getallclimate(): Observable<any>{
  //   return this.http.get<any>(this.climateUrl);
  // }


  getallclimate(){
    this.http.get(this.url).pipe(map((data: Response)=>{
      return data as any;
    })).toPromise().then(
      x =>{
        this.targetratinglist = x;
      }
    );

  }
}
