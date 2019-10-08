import { Component, OnInit, Input, Inject } from '@angular/core';
import { Buildinginfo } from 'src/app/models/buildinginfo';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ClimateService } from 'src/app/service/climate.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { Design } from 'src/app/models/design';
import { DesignService } from 'src/app/service/design.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buildinginfo',
  templateUrl: './buildinginfo.component.html',
  styleUrls: ['./buildinginfo.component.css']
})
export class BuildinginfoComponent implements OnInit {

  //buildinginfoobject: Buildinginfo = null;
  design: Design;
  designid: string = "";
  registeruser: Register;
  projectid: string = "";
  projectname: string = "";
  constructor(private router: Router, private climateservice: ClimateService,
    private route: ActivatedRoute, private loginservice: LoginserviceService, private localSt: LocalStorageService,
    private designservice: DesignService, private toastr: ToastrService) {
    //this.setDefault();
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
    this.loginservice.currentUser.subscribe(x => {
      if (x === null) {
        this.registeruser = loginapp;
      } else {
        this.registeruser = x;
      }

    });
  }

  ngOnInit() {

    this.setdefault();
    this.fetchingclimate();
    this.projectid = this.route.snapshot.paramMap.get("projectid");
    this.route.queryParams.subscribe(params => {
      this.projectname = decodeURIComponent(params['projectname']);
    });
  }

  fetchingclimate(){
    this.climateservice.getallhomestarlist();
    this.climateservice.getclimatelist();
  }



  selected1() {

  }

  setdefault() {
    this.design = {
      DesignName: "",
      TargetRating: null,
      Climatetype: null,
      CompletedBy: "",
      DrawingSet: "",
      FloorArea: null,
      NumofHabitationroom: null,
      Typology: "",
      DateCreated: "",
      City: "",
      StateName: "",
      StreetName: ""
    };
  }

  onSubmit(form: NgForm) {
    let date = new Date();
    var datestring: string = date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString();
    var timestring = (date.getHours() < 10 ? "0" + date.getHours(): date.getHours()) + ":" +(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" +(date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
    let timedatestring = datestring + " - " + timestring;
    this.design = {
      DesignName: form.value.designname,
      TargetRating: form.value.targetrating,
      Climatetype: form.value.climatetype,
      CompletedBy: form.value.completedby,
      DrawingSet: form.value.drawingset,
      FloorArea: Number(form.value.floorarea),
      NumofHabitationroom: Number(form.value.numofHabitationroom),
      Typology: form.value.typology,
      ProjectID: this.projectid,
      UserID: this.registeruser.ID,
      DateCreated: timedatestring,
      City: form.value.city,
      StateName: form.value.state,
      StreetName: form.value.street
    }
    console.log(this.design);
    this.designservice.designPosting(this.design).subscribe(x => {
      this.toastr.success("New Design Added!", "Design Message");
      // this.designservice.getlastdesignid(this.projectid, this.registeruser.ID).subscribe(res => {
      //   console.log(res);
      //   this.designid = res[res.length - 1].id;
      //   this.router.navigateByUrl("/main/" + `${this.registeruser.ID}` + "/buildingschedule", { queryParams: { projectid: this.projectid, designid: this.designid } });
      // });
      this.router.navigateByUrl("/main/" + `${this.registeruser.ID}` + "/project");
    }, err => {
      this.toastr.error("Something wrong!", "Design Message");
    });
  }


  setDefault() {
    this.loginservice.registermember = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }
}
