import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ehc1heatingenergy',
  templateUrl: './ehc1heatingenergy.component.html',
  styleUrls: ['./ehc1heatingenergy.component.css']
})
export class Ehc1heatingenergyComponent implements OnInit {

  state$: Observable<object>;
  statedata: any;

  
  constructor(public activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.state$ = this.activatedRoute.paramMap
    .pipe(map(() => window.history.state.data
    ));
    this.state$.subscribe(x => {
      this.statedata = x;
    });

    if(this.statedata === undefined){
      this.router.navigateByUrl('project');
    }
    console.log(this.statedata);
  }

}
