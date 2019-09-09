import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';
import { DesignService } from 'src/app/service/design.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buildingscheduleitem',
  templateUrl: './buildingscheduleitem.component.html',
  styleUrls: ['./buildingscheduleitem.component.css']
})
export class BuildingscheduleitemComponent implements OnInit {


  @Input() project: any;
  registeruser: Register;
  projecttitle: string = "";
  encodeparam: string = "";

  designsetlist = [];
  isedit: boolean = false;
  constructor(private projectservice: ProjectService, private loginservice: LoginserviceService,
    private toastr: ToastrService, private designservice: DesignService,
    private router: Router) {
    this.setdefault();
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
          this.registeruser = x;
        }
        
      });
    //this.designservice.designFetching(this.project.id);
   }

  ngOnInit() {
    this.designservice.designFetching(this.project.id).subscribe(res =>{
      this.designsetlist = res;
    }, err=>{
      this.toastr.error("Error at fetching", "Error Message");
    });
    this.encodeparam = encodeURIComponent(this.project.data.ProjectName);
  }



  renameedit(project){
    console.log(project);
    let date = new Date();
    if(this.projecttitle === "" || this.projecttitle === null ||
    this.projecttitle === undefined){
      this.toastr.error("The project title is blank. Please fill out", "Project Message");
    }else{
      const projectmodel:Project = {
        ProjectName: this.projecttitle,
        DateCreated: this.project.data.DateCreated,
        DateModified: date.getDate().toString() + "/" + (date.getMonth() + 1).toString() + "/" + date.getFullYear().toString()
      }
      this.projectservice.projectupdate(projectmodel, project.id, this.registeruser.ID).subscribe(x=>{
        this.toastr.info("Update project name success!", "Project Message");
        this.projectservice.projectfetching(this.registeruser.ID);
      }, err=>{
        this.toastr.error("Update project failed!", "Project Message");
      })
    }

  }

  deleteproject(id: string){
    if(confirm("Do you want to delete it?") === true){
      this.projectservice.projectdelete(id, this.registeruser.ID).subscribe(res =>{
        this.toastr.info("Delete project success!", "Project Message");
        this.projectservice.projectfetching(this.registeruser.ID);
      }, err =>{
        this.toastr.error("Delete project failed!", "Project Message");
      });
    }
  }

  redirecttoSchedule(i: any, projectid: string){
    console.log(i + projectid);
    //this.router.navigateByUrl("/main/" + `${this.registeruser.ID}` + "/buildingschedule", );
    this.router.navigate(["/main/"+`${this.registeruser.ID}`+"/buildingschedule"],{ queryParams: { projectid: projectid, designid: i.id } });
  }

  seeResult(i: any, projectid: string){
    this.router.navigate(["/main/"+`${this.registeruser.ID}`+"/ehc1heatingenergy"],{ queryParams: { projectid: projectid, designid: i.id } });
  }

  edittoggle(){
    this.isedit = !this.isedit;
    if(this.isedit){
      this.projecttitle = this.project.data.ProjectName;
    }else{
      this.projecttitle = "";
    }
  }

  setdefault(){
    this.loginservice.registermember = {
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Password: ""
    };
  }
}
