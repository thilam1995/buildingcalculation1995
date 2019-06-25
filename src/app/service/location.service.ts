import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  url: string = "http://localhost:8080/api/location";
  location = [];
  constructor(private http: HttpClient) { }

  getallLocation(){
    this.http.get(this.url).pipe(map((data: Response)=>{
      return data as any;
    })).toPromise().then(
      x =>{
        this.location = x;
      }
    );
  }
}
