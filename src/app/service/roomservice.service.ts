import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomserviceService {
  url: string = "http://localhost:8080/api/room";
  roomlist = [];
  constructor(private http: HttpClient) { }

  postingroom(){

  }

  updateroom(){

  }

  deleteroom(){

  }

  getallroombydesignid(){

  }
}
