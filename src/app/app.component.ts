import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { LoginserviceService } from './service/loginservice.service';
import { Register } from './models/register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buildingcalculator';

  //registeruser: Register;
  //isexisted: boolean = false;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title, private loginservice: LoginserviceService) {
      //this.loginservice.currentUser.subscribe(x => this.registeruser = x);
      //this.isexisted = localStorage.getItem("login") === "true" ? true : false; 
    }

  ngOnInit() {
    
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => this.titleService.setTitle(event['title']));
  }
}
