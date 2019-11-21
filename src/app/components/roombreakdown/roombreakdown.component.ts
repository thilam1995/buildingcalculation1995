import { Component, OnInit } from '@angular/core';
import { RoomserviceService } from 'src/app/service/roomservice.service';
import { Room } from 'src/app/models/room';
import { Windowshabit } from 'src/app/models/windowshabit';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { NgForm } from '@angular/forms';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-roombreakdown',
  templateUrl: './roombreakdown.component.html',
  styleUrls: ['./roombreakdown.component.css']
})
export class RoombreakdownComponent implements OnInit {

  windowhabitlist = [];
  room: Room;
  windowhabit: Windowshabit;
  orientation = ["North", "South", "East", "West"];

  projectid: string = "";
  designid: string = "";
  registeruser: Register;
  constructor(private roomserv: RoomserviceService, private toastr: ToastrService, public route: ActivatedRoute,
    private loginservice: LoginserviceService, private wallservice: WalldoorwindowService) {
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    this.loginservice.currentUser.subscribe(x => {
      if (x === null) {
        this.registeruser = loginapp;
      } else {
        this.registeruser = x;
      }

    });
    this.route.queryParams.subscribe(params => {
      this.projectid = params['projectid'];
      this.designid = params['designid'];
    });
  }

  ngOnInit() {
    this.setDefault();
  }

  fetchingwindowdata(){
    this.wallservice.windowlistdata(this.designid);
    this.wallservice.windowlist
  }

  addwindowhabit() {

  }

  deletewindowhabit() {

  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  setDefault() {
    this.room = {
      ID: "",
      RoomArea: null,
      RoomID: null,
      WindowList: []
    };
    this.windowhabitlist = [];
    this.windowhabit = {
      WindowID: null,
      WindowArea: 0,
      IsSafelysecure: false,
      IsShading: false,
      Orientation: null
    };
  }
}
