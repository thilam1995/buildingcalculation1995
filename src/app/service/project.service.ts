import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Project } from '../models/project';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectList = [];
  project: Project;
  url: string = environment.uri+"project";
  url1: string = environment.uri+"projectid";
  constructor(private http: HttpClient) { }

  projectposting(project: Project, id?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(project);
    return this.http.post<Project>(this.url, body, httpOptions).pipe(map(res => {
      this.projectfetching(id);
    }),
      catchError(this.handleError)
    );
  }

  projectupdate(project: Project, id?: string, userid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(project);
    return this.http.put<Project>(this.url + "/" + `${id}`, body, httpOptions).pipe(map(res => {
      this.projectfetching(userid);
    }),
      catchError(this.handleError)
    );
  }

  projectupdatedatemodify(datemodify: string, id: string, userid: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const bodyobject = {
      DateModified: datemodify
    };

    const body = JSON.stringify(bodyobject);
    return this.http.put<Project>(this.url + "/bydatemodified/" + `${id}`, body, httpOptions).pipe(map(res => {
      this.projectfetching(userid);
    }),
      catchError(this.handleError)
    );

  }

  projectdelete(projectid: string, id?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.delete(this.url + "/" + `${projectid}`, httpOptions).pipe(
      map(
        res => {
          this.projectfetching(id);
        }
      ), catchError(this.handleError)
    );
  }

  projectfetching(id?: string) {

    this.http.get(this.url + "/" + `${id}`).pipe(map((data: Response) => {
      return data as any;
    })).toPromise().then(
      x => {
        this.projectList = x;
      }
    ).catch(e => {
      catchError(this.handleError);
    });
  }


  getprojectid(id: string) {
    return this.http.get(this.url1 + "/" + `${id}`).pipe(map((data: Response) => {
      return data as any;
    }),
      catchError(this.handleError)
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
