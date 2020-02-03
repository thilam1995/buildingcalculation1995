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
import { ProjectService } from 'src/app/service/project.service';

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
  selectoption: string = "";
  designoption: string[] = ["filldesign", "selectexisted"];
  design1: Design;
  designSelect: any;
  designsetlist = [];

  constructor(private router: Router, private climateservice: ClimateService,
    private route: ActivatedRoute, private loginservice: LoginserviceService, private localSt: LocalStorageService,
    private designservice: DesignService, private toastr: ToastrService, private projectservice: ProjectService) {
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
    this.selectoption = this.designoption[0];
    this.setdefault();
    this.fetchingclimate();
    this.projectid = this.route.snapshot.paramMap.get("projectid");
    this.route.queryParams.subscribe(params => {
      this.projectname = decodeURIComponent(params['projectname']);
    });
    this.fetchingdesigndata();
  }

  fetchingclimate() {
    this.climateservice.getallhomestarlist();
    this.climateservice.getclimatelist();
  }

  fetchingdesigndata() {
    this.designservice.designFetching(this.projectid).subscribe(res => {
      this.designsetlist = res;
    }, err => {
      this.toastr.error("Error at fetching", "Error Message");
    });

  }


  selected1() {
    console.log(this.design.TargetRating);
  }


  setdefault() {
    this.designSelect = null;
    this.design = {
      DesignName: "",
      TargetRating: null,
      Climatetype: null,
      CompletedBy: "",
      DrawingSet: "",
      Typology: "",
      DateUpdate: "",
      DateCreated: "",
      City: "",
      StreetName: "",
      Postcode: "",
      FloorArea: null
    };
    this.design1 = {
      DesignName: "",
      TargetRating: null,
      Climatetype: null,
      CompletedBy: "",
      DrawingSet: "",
      Typology: "",
      DateUpdate: "",
      DateCreated: "",
      City: "",
      StreetName: "",
      Postcode: "",
      FloorArea: null
    };
  }

  onSubmit(form: NgForm) {
    if (this.selectoption === "filldesign") {
      if (form.value.targetrating === null || form.value.climatetype === null) {
        this.toastr.error("Error! Target Rating or Climate Type must not be empty or null.", "Design Message");
      } else {
        let date = new Date();
        var datestring: string = date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString();
        var timestring = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        const timedatestring = datestring + " " + timestring;
        this.design = {
          DesignName: form.value.designname,
          TargetRating: form.value.targetrating,
          Climatetype: form.value.climatetype,
          CompletedBy: form.value.completedby,
          DrawingSet: form.value.drawingset,
          Typology: form.value.typology,
          ProjectID: this.projectid,
          UserID: this.registeruser.ID,
          DateCreated: timedatestring,
          DateUpdate: timedatestring,
          City: form.value.city,
          StreetName: form.value.street,
          Postcode: form.value.postcode,
          FloorArea: form.value.floorarea
        }
        console.log(this.design);
        this.designservice.designPosting(this.design).subscribe(x => {
          this.toastr.success("New Design Added! Please wait...", "Design Message");
          this.projectservice.projectupdatedatemodify(timedatestring, this.projectid, this.registeruser.ID).subscribe(x => {
            this.toastr.info("Project Date Modify changed!", "Design Message");
          }, err => {
            this.toastr.error("Something Wrong", "Design Message");
          })

          setTimeout(() => {
            this.designservice.getlastdesignid(timedatestring).subscribe(res => {
              console.log(res);
              this.designid = res.id;
              console.log(this.designid);
              setTimeout(() => {
                this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
              }, 1400);

            });
          }, 1400);

          //this.router.navigateByUrl("/main/" + `${this.registeruser.ID}` + "/project");
        }, err => {
          this.toastr.error("Something wrong!", "Design Message");
        });
      }
    } else {
      if(this.designSelect === null){
        this.toastr.error("Please select existed design!", "Design Message");
      }else{
        let date = new Date();
        var datestring: string = date.getDate().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getFullYear().toString();
        var timestring = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        const timedatestring = datestring + " " + timestring;
        this.design = {
          DesignName: this.designSelect.DesignName,
          TargetRating: this.designSelect.TargetRating,
          Climatetype: this.designSelect.Climatetype,
          CompletedBy: this.designSelect.CompletedBy,
          DrawingSet: this.designSelect.DrawingSet,
          Typology: this.designSelect.Typology,
          ProjectID: this.projectid,
          UserID: this.registeruser.ID,
          DateCreated: timedatestring,
          DateUpdate: timedatestring,
          City: this.designSelect.City,
          StreetName: this.designSelect.StreetName,
          Postcode: this.designSelect.Postcode,
          FloorArea: this.designSelect.FloorArea
        };
        console.log(this.design);
        this.designservice.designPosting(this.design).subscribe(x => {
          this.toastr.success("New Design Added! Please wait...", "Design Message");
          this.projectservice.projectupdatedatemodify(timedatestring, this.projectid, this.registeruser.ID).subscribe(x => {
            this.toastr.info("Project Date Modify changed!", "Design Message");
          }, err => {
            this.toastr.error("Something Wrong", "Design Message");
          })
  
          setTimeout(() => {
            this.designservice.getlastdesignid(timedatestring).subscribe(res => {
              console.log(res);
              this.designid = res.id;
              console.log(this.designid);
              setTimeout(() => {
                this.router.navigate(["/main/" + `${this.registeruser.ID}` + "/buildingschedule"], { queryParams: { projectid: this.projectid, designid: this.designid } });
              }, 1400);
  
            });
          }, 1400);
  
          //this.router.navigateByUrl("/main/" + `${this.registeruser.ID}` + "/project");
        }, err => {
          this.toastr.error("Something wrong!", "Design Message");
        });
      }


    }


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
