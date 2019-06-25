import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-buildingscheduleitem',
  templateUrl: './buildingscheduleitem.component.html',
  styleUrls: ['./buildingscheduleitem.component.css']
})
export class BuildingscheduleitemComponent implements OnInit {


  @Input() project: any;
  registeruser: Register;

  isedit: boolean = false;
  constructor(private projectservice: ProjectService, private loginservice: LoginserviceService,
    private toastr: ToastrService) {
    this.loginservice.currentUser.subscribe(x => this.registeruser = x);
   }

  ngOnInit() {
  }

  renameedit(project){
    console.log(project);
    let date = new Date();
    const projectmodel:Project = {
      ProjectName: this.project.data.ProjectName,
      DateCreated: this.project.data.DateCreated,
      DateModified: date.getDate().toString() + "/" + date.getMonth().toString() + "/" + date.getFullYear().toString()
    }
    this.projectservice.projectupdate(projectmodel, project.id, this.registeruser.ID).subscribe(x=>{
      this.toastr.info("Update project anem success!", "Project Message");
      this.projectservice.projectfetching(this.registeruser.ID);
    }, err=>{
      this.toastr.error("Update project failed!", "Project Message");
    })
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


}
