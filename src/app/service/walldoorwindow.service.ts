import { Injectable } from '@angular/core';
import { WindowObject } from '../models/windowobject';
import { Wall } from '../models/wall';
import { Door } from '../models/door';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalldoorwindowService {


  url1: string = environment.uri+"wall";
  url2: string = environment.uri+"window";
  url3: string = environment.uri+"door";
  
  windowlist = [];
  walllist = [];
  doorlist = [];

  // windowobject: WindowObject;
  // wallobject: Wall;
  // doorobject: Door;

  constructor(private http: HttpClient) { }

  // windowlistdata(DesignID: string, UserID?: string, ProjectID?: string) {
  //   return this.http.get(this.url2 + "/" + `${DesignID}`).pipe(map((data: Response) =>{
  //     return data as any;
  //   }));
  // }

  // walllistdata(DesignID: string, UserID?: string, ProjectID?: string) {
  //   return this.http.get(this.url1 + "/" + `${DesignID}`).pipe(map((data: Response) =>{
  //     return data as any;
  //   }));
  // }

  // doorlistdata(DesignID: string, UserID?: string, ProjectID?: string) {
  //   return this.http.get(this.url3 + "/" + `${DesignID}`).pipe(map((data: Response) =>{
  //     return data as any;
  //   }));
  // }

  windowlistdata(DesignID: string, UserID?: string, ProjectID?: string) {
    this.http.get(this.url2 + "/" + `${DesignID}`).pipe(map((data: Response) =>{
      return data as any;
    })).toPromise().then(res =>{
      this.windowlist = res;
      this.windowlist.sort((a: any, b: any) =>{
        return (a.data.WindowName > b.data.WindowName) ? 1 : ((b.data.WindowName > a.data.WindowName) ? -1 : 0)
      });
    }).catch(err => this.handleError);
  }

  walllistdata(DesignID: string, UserID?: string, ProjectID?: string) {
    this.http.get(this.url1 + "/" + `${DesignID}`).pipe(map((data: Response) =>{
      return data as any;
    })).toPromise().then(res =>{
      this.walllist = res;
      this.walllist.sort((a: any, b: any) =>{
        return (a.data.WallName > b.data.WallName) ? 1 : ((b.data.WallName > a.data.WallName) ? -1 : 0)
      });
    }).catch(err => this.handleError);
  }

  doorlistdata(DesignID: string, UserID?: string, ProjectID?: string) {
    this.http.get(this.url3 + "/" + `${DesignID}`).pipe(map((data: Response) =>{
      return data as any;
    })).toPromise().then(res =>{
      this.doorlist = res;
      this.doorlist.sort((a: any, b: any) =>{
        return (a.data.DoorName > b.data.DoorName) ? 1 : ((b.data.DoorName > a.data.DoorName) ? -1 : 0)
      });
    }).catch(err => this.handleError);
  }

  doorposting(Door: Door, DesignID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Door);
    return this.http.post<Door>(this.url3, body, httpOptions).pipe(map(res => {
      this.doorlistdata(DesignID);
    }), catchError(this.handleError));
  }

  wallposting(Wall: Wall, DesignID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Wall);
    return this.http.post<Wall>(this.url1, body, httpOptions).pipe(map(res => {
      this.walllistdata(DesignID);
    }), catchError(this.handleError));
  }

  windowposting(WindowObject: WindowObject, designID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(WindowObject);
    return this.http.post<WindowObject>(this.url2, body, httpOptions).pipe(map(res => {
      this.windowlistdata(designID);
    }), catchError(this.handleError));
  }

  doorput(Door: Door, designid?: string, userid?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Door);
    return this.http.put<Door>(this.url3 + "/" + `${Door.ID}`, body, httpOptions).pipe(map(res => {
      this.doorlistdata(designid);
    }), catchError(this.handleError));;
  }

  wallput(Wall: Wall, DesignID?: string, userid?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Wall);
    return this.http.put<Wall>(this.url1 + "/" + `${Wall.ID}`, body, httpOptions).pipe(map(res => {
      this.walllistdata(DesignID);
    }), catchError(this.handleError));
  }

  windowput(Window: WindowObject, DesignID?: string, userid?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Window);
    return this.http.put<WindowObject>(this.url2 + "/" + `${Window.ID}`, body, httpOptions).pipe(map(res => {
      this.windowlistdata(DesignID);
    }), catchError(this.handleError));
  }

  doordelete(doorid: string, designID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url3 + "/" + `${doorid}`, httpOptions).pipe(map(res =>{
      console.log("Deleted");
      this.doorlistdata(designID);
    },
      catchError(this.handleError)));
  }

  walldelete(wallid: string, designID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url1 + "/" + `${wallid}`, httpOptions).pipe(map(res =>{
      console.log("Deleted");
      this.walllistdata(designID);
    },
      catchError(this.handleError)));
  }

  windowdelete(windowid: string, designID?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url2 + "/" + `${windowid}`, httpOptions).pipe(map(res => {
      console.log("Deleted");
      this.windowlistdata(designID);
    },
      catchError(this.handleError)));
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
