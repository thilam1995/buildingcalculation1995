import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimateService {

  climateUrl = 'assets/jsondata/homestar.json';
  climatelist = [];
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
    this.http.get(this.climateUrl).pipe(map((data: Response) =>{
      return data as any;
    })).toPromise().then(
      x => {
        this.climatelist = x.HomeStarRating;
        console.log(this.climatelist);
      }
    );
  }
}
