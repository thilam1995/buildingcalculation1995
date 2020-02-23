import { Component, OnInit, Input } from '@angular/core';
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

  @Input() numberofhabitroom: number;
  windowhabitlist = [];
  room: Room;
  ishabitable: boolean = true;
  windowhabit: Windowshabit;
  orientation = ["North", "South", "East", "West"];

  booleanlist = [true, false];

  projectid: string = "";
  designid: string = "";
  windowsobjectprop: any;
  windowname: string;
  windowarea: number;
  registeruser: Register;
  isshowed: boolean = false;

  constructor(public roomserv: RoomserviceService, private toastr: ToastrService, public route: ActivatedRoute,
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
    this.numberofhabitroom = this.roomserv.roomlist.length;
    this.fetchingdata();
  }

  fetchingdata() {
    this.wallservice.windowlistdata(this.designid);
    this.roomserv.getallroomtypelist();
  }

  addwindowhabit() {
    if (this.windowsobjectprop === null || this.windowhabit.Orientation === null) {
      this.toastr.error("Window cannot be empty");
    } else {
      this.windowhabitlist.push(this.windowhabit);
      this.windowhabit = {
        WindowID: {
          Name: null,
          Area: 0,
          OWA: 0
        },
        IsSafelysecure: true,
        IsShading: true,
        Orientation: null
      };
      this.windowsobjectprop = null;
    }
  }

  deletewindowhabit(index: number) {
    if (confirm("Are you sure that you want to delete?") === true) {
      this.windowhabitlist.splice(index, 1);
    }
  }

  getwindownameandarea() {
    console.log(this.windowsobjectprop);
    this.windowhabit.WindowID = {
      Name: this.windowsobjectprop.WindowName,
      Area: this.windowsobjectprop.Area,
      OWA: this.windowsobjectprop.OWA
    };
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (form.value.roomtype === "Mainlivingroomarea" || form.value.roomtype === "MainBedroom") {
      const found = this.roomserv.roomlist.some(x => x.data.RoomType === form.value.roomtype);
      if (found) {
        this.toastr.error("You already added living/main bedroom! Please choose another room!", "Info Message");
      } else {
        if (this.windowhabitlist.length === 0) {
          if (confirm("There is no window! Are you sure you want to add new habitable room?") === true) {
            if (this.room.ID === null) {
              this.room = {
                RoomID: form.value.roomid,
                RoomType: form.value.roomtype,
                RoomArea: Number(form.value.roomarea),
                WindowList: this.windowhabitlist,
                DesignID: this.designid,
                ProjectID: this.projectid,
                UserID: this.registeruser.ID
              };
              this.roomserv.postingroom(this.room, this.designid).subscribe(x => {
                this.toastr.success("Insert new room successfully", "Info Message");
                this.toastr.success("Insert new room successfully", "Info Message");
                this.setDefault();
              }, err => {
                this.toastr.error("Insert new model failed", "Info Message");
              })
            }
          }
        } else {
          if (this.room.ID === null) {
            this.room = {
              RoomID: form.value.roomid,
              RoomType: form.value.roomtype,
              RoomArea: Number(form.value.roomarea),
              WindowList: this.windowhabitlist,
              DesignID: this.designid,
              ProjectID: this.projectid,
              UserID: this.registeruser.ID
            };
            this.roomserv.postingroom(this.room, this.designid).subscribe(x => {
              this.toastr.success("Insert new room successfully", "Info Message");
              this.setDefault();
            }, err => {
              this.toastr.error("Insert new model failed", "Info Message");
            })
          }
        }
      }
    } else if (form.value.roomtype === "Studiodwelling") {
      const found = this.roomserv.roomlist.some(x => x.data.RoomType === "Studiodwelling");
      const found1 = this.roomserv.roomlist.some(x => x.data.RoomType === "Mainlivingroomarea");
      const found2 = this.roomserv.roomlist.some(x => x.data.RoomType === "MainBedroom");
      const found3 = this.roomserv.roomlist.some(x => x.data.RoomType === "OtherHabitableroom");
      if (found) {
        this.toastr.error("You already added studio room bedroom! Please choose another room!", "Info Message");
      }
      else if (found1) {
        this.toastr.error("There is a living room. No adding studio room!", "Info Message");
      } else if (found2) {
        this.toastr.error("There is a main bedroom. No adding studio room!", "Info Message");
      } else if (found3) {
        this.toastr.error("There is some or more habitable rooms. No adding studio room!", "Info Message");
      } else {
        if (this.windowhabitlist.length === 0) {
          if (confirm("There is no window! Are you sure you want to add new habitable room?") === true) {
            if (this.room.ID === null) {
              this.room = {
                RoomID: form.value.roomid,
                RoomType: form.value.roomtype,
                RoomArea: Number(form.value.roomarea),
                WindowList: this.windowhabitlist,
                DesignID: this.designid,
                ProjectID: this.projectid,
                UserID: this.registeruser.ID
              };
              this.roomserv.postingroom(this.room, this.designid).subscribe(x => {
                this.toastr.success("Insert new room successfully", "Info Message");
                this.setDefault();
              }, err => {
                this.toastr.error("Insert new model failed", "Info Message");
              })
            }
          }
        } else {
          if (this.room.ID === null) {
            this.room = {
              RoomID: form.value.roomid,
              RoomType: form.value.roomtype,
              RoomArea: Number(form.value.roomarea),
              WindowList: this.windowhabitlist,
              DesignID: this.designid,
              ProjectID: this.projectid,
              UserID: this.registeruser.ID
            };
            this.roomserv.postingroom(this.room, this.designid).subscribe(x => {
              this.toastr.success("Insert new room successfully", "Info Message");
              this.setDefault();
            }, err => {
              this.toastr.error("Insert new model failed", "Info Message");
            })
          }
        }
      }
    }
    else if (this.room.RoomType === null) {
      this.toastr.error("Please select the room!", "Info Message");
    } else {
      if (this.windowhabitlist.length === 0) {
        if (confirm("There is no window! Are you sure you want to add new habitable room?") === true) {
          if (this.room.ID === null) {
            this.room = {
              RoomID: form.value.roomid,
              RoomType: form.value.roomtype,
              RoomArea: Number(form.value.roomarea),
              WindowList: this.windowhabitlist,
              DesignID: this.designid,
              ProjectID: this.projectid,
              UserID: this.registeruser.ID
            };
            this.roomserv.postingroom(this.room, this.designid).subscribe(x => {
              this.toastr.success("Insert new room successfully", "Info Message");
              this.setDefault();
            }, err => {
              this.toastr.error("Insert new model failed", "Info Message");
            })
          }
        }
      } else {
        if (this.room.ID === null) {
          this.room = {
            RoomID: form.value.roomid,
            RoomType: form.value.roomtype,
            RoomArea: Number(form.value.roomarea),
            WindowList: this.windowhabitlist,
            DesignID: this.designid,
            ProjectID: this.projectid,
            UserID: this.registeruser.ID
          };
          this.roomserv.postingroom(this.room, this.designid).subscribe(x => {
            this.toastr.success("Insert new room successfully", "Info Message");
            this.setDefault();
          }, err => {
            this.toastr.error("Insert new model failed", "Info Message");
          })
        }
      }
    }
  }

  setDefault() {
    this.room = {
      ID: null,
      RoomArea: null,
      RoomID: null,
      WindowList: [],
      RoomType: null,
      DesignID: null,
      ProjectID: null,
      UserID: null
    };
    this.windowhabitlist = [];
    this.windowhabit = {
      WindowID: null,
      IsSafelysecure: true,
      IsShading: true,
      Orientation: null
    };
  }
}
