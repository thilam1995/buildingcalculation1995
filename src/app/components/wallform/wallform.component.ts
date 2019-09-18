import { Component, OnInit, Input } from '@angular/core';
import { Wall } from 'src/app/models/wall';
import { NgForm } from '@angular/forms';
import { LocalStorage } from 'ngx-webstorage';
import { WalldoorwindowService } from 'src/app/service/walldoorwindow.service';
import { ActivatedRoute } from '@angular/router';
import { LoginserviceService } from 'src/app/service/loginservice.service';
import { Register } from 'src/app/models/register';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallform',
  templateUrl: './wallform.component.html',
  styleUrls: ['./wallform.component.css']
})
export class WallformComponent implements OnInit {

  @Input() wallobject: Wall;
  @Input() wallobjectlist = [];


  designid: string = "";
  projectid: string = "";
  registeruser: Register;
  constructor(private wallservice: WalldoorwindowService,
    public route: ActivatedRoute, private loginservice: LoginserviceService,
    private toastr: ToastrService) {
    this.route.queryParams.subscribe(params => {
      this.projectid = params['projectid'];
      this.designid = params['designid'];
    });
    let loginapp = JSON.parse(localStorage.getItem('currentUser'));
      this.loginservice.currentUser.subscribe(x => {
        if(x === null){
          this.registeruser = loginapp;
        }else{
          this.registeruser = x;
        }
        
      });
    this.setdefault();
  }

  ngOnInit() {
    this.fetchingwalldata();
  }

  fetchingwalldata(){
    this.wallservice.walllistdata(this.designid);
  }

  setdefault() {
    this.wallobject = {
      ID: null,
      WallName: null,
      ConstructionRValue: null,
      Description: null,
      DesignID: null,
      ProjectID: null,
      UserID: null
    };
  }


  onSubmit(form: NgForm) {

    console.log(form.value);
    if (form.value.ID === null) {
      this.wallobject = {
        WallName: form.value.wallName,
        ConstructionRValue: Number(form.value.constructionRValue),
        Description: form.value.description,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };

      const found = this.wallservice.walllist.some(x => {
        return x.data.WallName === this.wallobject.WallName
      }); //This boolean will detect if the wall name is existed to prevent duplicate with different value
      console.log(found);
      if(!found){
        this.wallservice.wallposting(this.wallobject, this.designid).subscribe(res => {
          this.toastr.success("Complete Wall Success.", "Successful");
          setTimeout(() => {
            this.fetchingwalldata(); //Refresh Component
          }, 1500);
          this.setdefault();
          
        }, err => {
          this.toastr.error("Complete Wall failed.", "Successful");
        });
      }else{
        this.toastr.warning("The wall name is existed.", "No Duplicate Name");
        form.reset();
      }

    } else {
      this.wallobject = {
        ID: form.value.ID,
        WallName: form.value.wallName,
        ConstructionRValue: Number(form.value.constructionRValue),
        Description: form.value.description,
        DesignID: this.designid,
        ProjectID: this.projectid,
        UserID: this.registeruser.ID
      };
      console.log(this.wallobject);
      this.wallservice.wallput(this.wallobject, this.designid).subscribe(res => {
        this.toastr.success("Update Wall Successfully", "Info Message!");
        setTimeout(() => {
          this.fetchingwalldata();
        }, 1500);
        this.setdefault();
      }, err => {
        this.toastr.error("Update Wall failed", "Info Message!");
      });
    }
    

  }


  editFieldValue(wall: any) {
    console.log(wall);
    let wall1: Wall = {
      ID: wall.id,
      WallName: wall.data.WallName,
      ConstructionRValue: wall.data.ConstructionRValue,
      Description: wall.data.Description,
      DesignID: wall.data.DesignID,
      ProjectID: wall.data.ProjectID,
      UserID: wall.data.UserID
    }
    this.wallobject = Object.assign({}, wall1);
  }




  deleteFieldValue(id: string) {
    if (confirm("Do you want to delete the selected wall?") === true) {
      console.log(id);
      this.wallservice.walldelete(id, this.designid).subscribe(
        res => {
          this.toastr.success("Delete successfully", "Info Message!");
          this.wallservice.walllist.filter(x => x.id !== id);
        }, err => {
          this.toastr.error("Delete failed", "Info Message!");
        }
      );
    }
  }

}
