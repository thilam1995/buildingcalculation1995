import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Wallwindowdoormodel } from '../models/wallwindowdoormodel';
import { Roofskylightmodel } from '../models/roofskylightmodel';
import { Floormodel } from '../models/floormodel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingmodelService {

  url: string = environment.uri + "wallwindowdoormodel";
  url1: string = environment.uri + "roofskylightmodel";
  url2: string = environment.uri + "floormodel";

  wallwindowdoormodellist = [];
  roofskylightmodellist = [];
  floormodellist = [];


  constructor(private http: HttpClient) { }
  //Wall, Window and Door Model Section
  wallwindowdoormodelGet(designid: string) {
    this.http.get<any>(this.url + "/" + `${designid}`).pipe(map((data: Response) => {
      return data as any;
    })).toPromise().then(x => {
      this.wallwindowdoormodellist = x;
      this.wallwindowdoormodellist.sort((a: any, b: any) => {
        let datea = new Date(a.data.DateCreated), dateb = new Date(b.data.DateCreated);
        if (datea > dateb) return 1;
        if (datea < dateb) return -1;
        return 0;
      });
    }).catch(e => {
      catchError(this.handleError);
    });
  }

  fetchwallwindowdoormodel(designid: string) {
    return this.http.get<any>(this.url + "/" + `${designid}`).pipe(map((data: Response) => {
      return data as any;
    }));
  }

  wallwindowdoormodelPost(wallwindowdoormodel: Wallwindowdoormodel, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(wallwindowdoormodel);
    return this.http.post<any>(this.url, body, httpOptions).pipe(map(res => {
      this.wallwindowdoormodelGet(designid);
    }), catchError(this.handleError));
  }

  wallwindowdoormodelUpdate(id: string, wallwindowdoormodel: Wallwindowdoormodel, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(wallwindowdoormodel);
    return this.http.put<any>(this.url + "/" + `${id}`, body, httpOptions).pipe(map(res => {
      this.wallwindowdoormodelGet(designid);
    }), catchError(this.handleError));
  }

  wallwindowdoormodelDelete(id: string, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(this.url + "/" + `${id}`, httpOptions).pipe(map(res => {
      this.wallwindowdoormodelGet(designid);
    }), catchError(this.handleError));
  }

  //Roof and Skylight Model Section
  roofskylightmodelGet(designid: string) {
    this.http.get<any>(this.url1 + "/" + `${designid}`).pipe(map((data: Response) => {
      return data as any;
    })).toPromise().then(x => {
      this.roofskylightmodellist = x;
      this.roofskylightmodellist.sort((a: any, b: any) => {
        let datea = new Date(a.data.DateCreated), dateb = new Date(b.data.DateCreated);
        if (datea > dateb) return 1;
        if (datea < dateb) return -1;
        return 0;
      });
    }).catch(e => {
      catchError(this.handleError);
    });
  }

  fetchroofskylightmodelGet(designid: string) {
    return this.http.get<any>(this.url1 + "/" + `${designid}`).pipe(map((data: Response) => {
      return data as any;
    }));
  }

  roofskylightmodelPost(roofskymodel: Roofskylightmodel, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(roofskymodel);
    return this.http.post<any>(this.url1, body, httpOptions).pipe(map(res => {
      this.roofskylightmodelGet(designid);
    }), catchError(this.handleError));
  }

  roofskylightmodelUpdate(id: string, roofskymodel: Roofskylightmodel, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(roofskymodel);
    return this.http.put<any>(this.url1 + "/" + `${id}`, body, httpOptions).pipe(map(res => {
      this.roofskylightmodelGet(designid);
    }), catchError(this.handleError));
  }

  roofskylightmodelDelete(id: string, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(this.url1 + "/" + `${id}`, httpOptions).pipe(map(res => {
      this.roofskylightmodelGet(designid);
    }), catchError(this.handleError));
  }

  //   //Floor Model Section
  floormodelGet(designid: string) {
    this.http.get<any>(this.url2 + "/" + `${designid}`).pipe(map((data: Response) => {
      return data as any;
    })).toPromise().then(x => {
      this.floormodellist = x;
      this.floormodellist.sort((a: any, b: any) => {
        let datea = new Date(a.data.DateCreated), dateb = new Date(b.data.DateCreated);
        if (datea > dateb) return 1;
        if (datea < dateb) return -1;
        return 0;
      });
    }).catch(e => {
      catchError(this.handleError);
    });
  }

  fetchfloormodel(designid: string) {
    return this.http.get<any>(this.url2 + "/" + `${designid}`).pipe(map((data: Response) => {
      return data as any;
    }));
  }

  floormodelPost(floormodel: Floormodel, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(floormodel);
    return this.http.post<any>(this.url2, body, httpOptions).pipe(map(res => {
      this.floormodelGet(designid);
    }), catchError(this.handleError));
  }

  floormodelUpdate(id: string, floormodel: Floormodel, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(floormodel);
    return this.http.put<any>(this.url2 + "/" + `${id}`, body, httpOptions).pipe(map(res => {
      this.floormodelGet(designid);
    }), catchError(this.handleError));
  }

  floormodelDelete(id: string, designid?: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(this.url2 + "/" + `${id}`, httpOptions).pipe(map(res => {
      this.floormodelGet(designid);
    }), catchError(this.handleError));
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
