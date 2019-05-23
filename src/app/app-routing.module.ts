import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BuildingscheduleComponent } from './components/buildingschedule/buildingschedule.component';
import { BuildingschedulelistComponent } from './components/buildingschedulelist/buildingschedulelist.component';
import { ProjectComponent } from './components/project/project.component';
import { Ehc1heatingenergyComponent } from './components/ehc1heatingenergy/ehc1heatingenergy.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent , data:{title: "Welcome to Building Scheduler"}},
  {path: 'buildingschedule', component: BuildingscheduleComponent, data:{title: "Building Scheduler Form"}},
  {path: 'buildingschedulelist', component: BuildingschedulelistComponent, data: {title: "Building Schedule List"}},
  {path: 'project', component: ProjectComponent, data: {title: "Start Project"}},
  {path: 'ehc1heatingenergy', component: Ehc1heatingenergyComponent, data: {title: "Heating Energy Result"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
