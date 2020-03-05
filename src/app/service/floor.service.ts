import { Injectable } from '@angular/core';
import { Floors } from '../models/floors';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  //Floor: Floors;
  url: string = environment.uri+"floor";
  floorlist = [];

  constructor(private http: HttpClient) { }

  // floorlistdata(designID: string){
  //   return this.http.get(this.url + "/" + `${designID}`).pipe(map((data: Response) =>{
  //     return data as any;
  //   }));
  // }

  floorlistdata(designID: string){
    return this.http.get(this.url + "/" + `${designID}`).pipe(map((data: Response) =>{
      return data as any;
    })).toPromise().then(res => {
      this.floorlist = res;
      this.floorlist.sort((a: any, b: any) => {
        let datea = new Date(a.data.DateCreated), dateb = new Date(b.data.DateCreated);
        if (datea > dateb) return 1;
        if (datea < dateb) return -1;
        return 0;
      })
    });
  }

  addfloor(Floor: Floors, designID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Floor);
    return this.http.post<Floors>(this.url, body, httpOptions).pipe(map(res => {
      this.floorlistdata(designID);
    }), catchError(this.handleError));
  }

  updatefloor(Floor: Floors, designID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Floor);
    return this.http.put<Floors>(this.url + "/" + `${Floor.ID}`, body, httpOptions).pipe(map(res => {
      this.floorlistdata(designID);
    }), catchError(this.handleError));
  }

  deletefloor(floorid: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url + "/" + `${floorid}`, httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
