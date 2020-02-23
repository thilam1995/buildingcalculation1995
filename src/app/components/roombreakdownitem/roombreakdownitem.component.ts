import { Component, OnInit, Input } from '@angular/core';
import { RoomserviceService } from 'src/app/service/roomservice.service';
import { Room } from 'src/app/models/room';
import { Windowshabit } from 'src/app/models/windowshabit';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { BuildingmodelService } from 'src/app/service/buildingmodel.service';
import { Register } from 'src/app/models/register';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-roombreakdownitem',
  templateUrl: './roombreakdownitem.component.html',
  styleUrls: ['./roombreakdownitem.component.css']
})
export class RoombreakdownitemComponent implements OnInit {

  isedit: boolean = false;
  isdisplay: boolean = false;
  @Input() i: any;

  projectid: string = "";
  designid: string = "";
  room: Room;
  windowhabit: Windowshabit;
  orientation = ["North", "South", "East", "West"];
  registeruser: Register;
  booleanlist = [true, false];
  windowhabitlist = [];
  windowsobjectprop: any;
  windowname: string;
  windowarea: number;
  ishabitable: boolean = true;

  constructor(private roomserv: RoomserviceService, private toastr: ToastrService, public route: ActivatedRoute,
    private loginservice: LoginserviceService, private buildingmodelservice: BuildingmodelService,
    private wallservice: WalldoorwindowService) {
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
    this.fetchingwindowdata();
    this.getroomtypelist();
  }

  fetchingwindowdata() {
    this.wallservice.windowlistdata(this.designid);
  }

  getroomtypelist() {
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

  onUpdate(id: string) {
    if (this.room.RoomID === "" || this.room.RoomID === null || this.room.RoomArea === null || this.room.RoomArea === 0) {
      this.toastr.error("Error! RoomID or Room Area cannot be blank!");
    } else {
      this.room.WindowList = this.windowhabitlist;
      this.roomserv.updateroom(this.room, this.designid).subscribe(x => {
        this.toastr.success("Room Updated");
        this.setDefault();
        setTimeout(() => {
          this.roomserv.getallroombydesignid(this.designid);
        }, 1200);
      }, err => {
        this.toastr.error("Something wrong!", "Info");
      });
    }
  }

  onDelete(id: string) {
    if (confirm("Are you sure you want to delete this selected room?") === true) {
      this.roomserv.deleteroom(id, this.designid).subscribe(x => {
        this.toastr.success("Delete Successfully", "Info");
        setTimeout(() => {
          this.roomserv.getallroombydesignid(this.designid);
        }, 1200);
      }, err => {
        this.toastr.error("Something wrong!", "Info");
      });
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

  onEdit(i: any) {
    this.isedit = true;
    if(this.isdisplay){
      this.isdisplay = false;
    }
    if (i.data.RoomID !== "Bathroom") {
      this.ishabitable = true;
      this.room = {
        ID: i.id,
        RoomID: i.data.RoomID,
        RoomType: i.data.RoomType,
        RoomArea: i.data.RoomArea,
        DesignID: i.data.DesignID,
        ProjectID: i.data.ProjectID,
        UserID: i.data.UserID,
        WindowList: i.data.WindowList
      };
    } else {
      this.ishabitable = false;
      this.room = {
        ID: i.id,
        RoomID: i.data.RoomID,
        RoomType: i.data.RoomType,
        RoomArea: i.data.RoomArea,
        DesignID: i.data.DesignID,
        ProjectID: i.data.ProjectID,
        UserID: i.data.UserID,
        WindowList: i.data.WindowList
      };
    }


    this.windowhabitlist = this.room.WindowList;

  }


  onCancel() {
    this.isedit = false;
  }


}
