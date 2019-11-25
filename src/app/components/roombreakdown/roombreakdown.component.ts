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

  booleanlist = [true, false];

  projectid: string = "";
  designid: string = "";
  windowsobjectprop: any;
  windowname: string;
  windowarea: number;
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
    this.roomserv.getallroombydesignid(this.designid);
  }

  fetchingwindowdata(){
    this.wallservice.windowlistdata(this.designid);
  }

  addwindowhabit() {
    if(this.windowsobjectprop === null || this.windowhabit.Orientation === null){
      this.toastr.error("Window cannot be empty");
    }else{
      this.windowhabitlist.push(this.windowhabit);
      this.windowhabit = {
        WindowID: {
          Name: null,
          Area: 0
        },
        IsSafelysecure: false,
        IsShading: false,
        Orientation: null
      };
      this.windowsobjectprop = null;
    }
  }

  deletewindowhabit(index: number) {
    if(confirm("Are you sure that you want to delete?") === true){
      this.windowhabitlist.splice(index, 1);
    }
  }

  getwindownameandarea(){
    console.log(this.windowsobjectprop);
    this.windowhabit.WindowID = {
      Name: this.windowsobjectprop.WindowName,
      Area: this.windowsobjectprop.Area
    };
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if(this.room.ID === null){
      this.room = {
        RoomID: form.value.roomid,
        RoomArea: Number(form.value.roomarea),
        WindowList: this.windowhabitlist,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
      console.log(this.room);
      this.roomserv.postingroom(this.room, this.designid).subscribe(x =>{
        this.toastr.success("Insert new room successfully", "Info Message");
        this.setDefault();
      }, err => {
        this.toastr.error("Insert new model failed", "Info Message");
      })
    }else{

    }
  }

  setDefault() {
    this.room = {
      ID: null,
      RoomArea: null,
      RoomID: null,
      WindowList: []
    };
    this.windowhabitlist = [];
    this.windowhabit = {
      WindowID: null,
      IsSafelysecure: false,
      IsShading: false,
      Orientation: null
    };
  }
}
