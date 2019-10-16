import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Design } from '../models/design';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  designlist = [];
  url: string = "http://localhost:8080/api/design";
  constructor(private http: HttpClient) { }

  designPosting(design: Design, projectid?: string, userid?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(design);

    return this.http.post<Design>(this.url, body, httpOptions).pipe(map(res =>{

    }),retry(3),catchError(this.handleError));
  }

  designUpdating(Design: Design, designid?: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(Design);
    return this.http.put<Design>(this.url + "/" + `${designid}`, body, httpOptions).pipe(retry(3),map(res => {
      retry(3);
      this.getdesignbyID(designid);
    }),catchError(this.handleError));
  }

  selectdesign(designid?: string,projectid?: string, userid?: string){

  }

  designFetching(projectid: string, userid?: string){
    return this.http.get(this.url+"/"+`${projectid}`).pipe(map((data: Response) =>{
      return data as any;
    }), catchError(this.handleError));
  }

  getdesignbyID(designid: string){
    return this.http.get(this.url+"/getdesign/"+`${designid}`).pipe(map((data: Response) =>{
      return data as any;
    }), catchError(this.handleError));
  }

  getlastdesignid(datetime: string){
    return this.http.get(this.url+"/last/"+`${datetime}`).pipe(map((data: Response) =>{
      return data as any;
    }), catchError(this.handleError));
  }

  deleteselectdesignid(id: string, projectid: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(this.url+ "/" +`${id}`, httpOptions).pipe(
      map(
        res => {
          setTimeout(() => {
            this.designFetching(projectid);
          }, 1200);
        }
      ), catchError(this.handleError)
    );
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
