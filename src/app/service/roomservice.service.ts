import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Room } from '../models/room';
@Injectable({
  providedIn: 'root'
})
export class RoomserviceService {
  url: string = "http://localhost:8080/api/roomhabit";
  urljson: string = "assets/jsondata/roomtype.json";
  roomlist = [];
  roomtypelist = [];

  constructor(private http: HttpClient) { }

  getallroomtypelist() {
    this.http.get(this.urljson).pipe(map((data: Response) => {
      return data as any;
    })).toPromise().then(
      x => {
        console.log(x.Roomtypelist);
        this.roomtypelist = x.Roomtypelist;
      }
    );
  }

  postingroom(room: Room, DesignID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(room);
    return this.http.post(this.url, body, httpOptions).pipe(map(res => {
      setTimeout(() => {
        this.getallroombydesignid(DesignID);
      }, 1200);
    }), catchError(this.handleError));
  }

  updateroom(room: Room, designID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(room);
    return this.http.put(this.url + "/" + `${room.ID}`, body, httpOptions).pipe(map(res => {
      this.getallroombydesignid(designID);
    }), catchError(this.handleError));
  }

  deleteroom(roomID: string, designID?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url + "/" + `${roomID}`, httpOptions).pipe(map(res => {
      this.getallroombydesignid(designID);
    }), catchError(this.handleError));
  }

  getallroombydesignid(designID: string) {
    this.http.get(this.url + "/" + `${designID}`).pipe(map((data: Response) => {
      return data as any;
    })).toPromise().then(res => {
      this.roomlist = res;
    }).catch(err => this.handleError);
  }

  fetchroombyid(designID: string){
    return this.http.get<any>(this.url + "/" + `${designID}`).pipe(map((data: Response) => {
      return data as any;
    }));
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
