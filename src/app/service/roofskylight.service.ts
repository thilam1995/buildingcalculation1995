import { Injectable } from '@angular/core';
import { Roof } from '../models/roof';
import { Skylights } from '../models/skylights';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoofskylightService {

  url1: string = "http://localhost:8080/api/roof";
  url2: string = "http://localhost:8080/api/skylight";


  constructor(private http: HttpClient) { }

  rooflistdata(designID: string){
    return this.http.get(this.url1 + "/" + `${designID}`).pipe(map((data: Response) =>{
      return data as any;
    }));
  }

  skylightlistdata(designID: string){
    return this.http.get(this.url2 + "/" + `${designID}`).pipe(map((data: Response) =>{
      return data as any;
    }));
  }

  addroof(Roof: Roof, ProjectID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Roof);
    return this.http.post<Roof>(this.url1, body, httpOptions).pipe(map(res => {
      this.rooflistdata(ProjectID);
    }), catchError(this.handleError));
  }

  addskylight(Skylight: Skylights, ProjectID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Skylight);
    return this.http.post<Skylights>(this.url2, body, httpOptions).pipe(map(res => {
      this.rooflistdata(ProjectID);
    }), catchError(this.handleError));
  }

  updateroof(Roof: Roof, ProjectID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Roof);
    return this.http.put<Roof>(this.url1 + "/" + `${Roof.ID}`, body, httpOptions).pipe(map(res => {
      this.rooflistdata(ProjectID);
    }), catchError(this.handleError));
  }

  updateskylight(Skylight: Skylights, ProjectID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Skylight);
    return this.http.put<Skylights>(this.url2 + "/" + `${Skylight.ID}`, body, httpOptions).pipe(map(res => {
      this.rooflistdata(ProjectID);
    }), catchError(this.handleError));
  }

  deleteroof(id: string, DesignID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url1 + "/" + `${id}`, httpOptions).pipe(catchError(this.handleError));
  }

  deleteskylight(id: string, ProjectID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url2 + "/" + `${id}`, httpOptions).pipe(catchError(this.handleError));
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
