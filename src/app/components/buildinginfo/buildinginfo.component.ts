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
  constructor(private locationService: LocationService,
    private router: Router, private climateservice: ClimateService,
    private route: ActivatedRoute, private loginservice: LoginserviceService, private localSt: LocalStorageService,
    private designservice: DesignService, private toastr: ToastrService) {
    //this.setDefault();
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
          this.registeruser = x;
        }
        
      });
  }

  ngOnInit() {

    this.setdefault();
    this.climateservice.getallclimate();
    this.locationService.getallLocation();
    this.projectid = this.route.snapshot.paramMap.get("projectid");
    this.route.queryParams.subscribe(params => {
      this.projectname = decodeURIComponent(params['projectname']);
    });
  }



  selected1() {
    //console.log(this.buildinginfoobject.Location);
    this.localSt.store('targetrating', this.design.TargetRating);
    console.log(this.localSt.retrieve('targetrating'));
  }

  setdefault() {
    this.design = {
      DesignName: "",
      TargetRating: null,
      Location: null,
      CompletedBy: "",
      DrawingSet: "",
      FloorArea: null,
      NumofHabitationroom: null,
      Typology: "",
    };
  }

  onSubmit(form: NgForm) {

    this.design = {
      DesignName: form.value.designname,
      TargetRating: form.value.targetrating,
      Location: form.value.location,
      CompletedBy: form.value.completedby,
      DrawingSet: form.value.drawingset,
      FloorArea: Number(form.value.floorarea),
      NumofHabitationroom: Number(form.value.numofHabitationroom),
      Typology: form.value.typology,
      ProjectID: this.projectid,
      UserID: this.registeruser.ID
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


  setDefault(){
    this.loginservice.registermember = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }
}
