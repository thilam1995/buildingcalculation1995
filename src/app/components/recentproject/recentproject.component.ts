import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/models/register';
import { ProjectService } from 'src/app/service/project.service';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recentproject',
  templateUrl: './recentproject.component.html',
  styleUrls: ['./recentproject.component.css']
})
export class RecentprojectComponent implements OnInit {

  searchproject: string = "";
  registeruser: Register;
  registerID: string = "";
  loading: boolean = false;
  isopen: boolean = false;
  constructor(private projectservice: ProjectService, private loginservice: LoginserviceService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.setdefault();
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    this.loginservice.currentUser.subscribe(x => {
      if (x === null) {
        this.registeruser = loginapp;
      } else {
        this.registeruser = x;
      }

    });
    setTimeout(() => {


      this.registerID = this.loginservice.currentUserValue.ID;

      this.projectservice.projectfetching(this.registerID);
      this.loading = true;
    }, 1900);
  }

  setdefault() {
    this.projectservice.projectList = [];
    this.registerID = "";
  }

}
