import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BuildingscheduleComponent } from './components/buildingschedule/buildingschedule.component';
import { BuildingschedulelistComponent } from './components/buildingschedulelist/buildingschedulelist.component';
import { ProjectComponent } from './components/project/project.component';
import { Ehc1heatingenergyComponent } from './components/ehc1heatingenergy/ehc1heatingenergy.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { HomelayoutComponent } from './components/homelayout/homelayout.component';
import { Buildinginfo } from './models/buildinginfo';
import { BuildinginfoComponent } from './components/buildinginfo/buildinginfo.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { SettingComponent } from './components/setting/setting.component';
import { Notfound404Component } from './components/notfound404/notfound404.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: "Login" } },
  {
    path: 'main/:id', component: HomelayoutComponent, data: { title: "Welcome to Building Scheduler" }, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { title: "Home" } },
      { path: 'project', component: ProjectComponent, data: { title: "Project" } },
      // { path: 'buildingschedulelist', component: BuildingschedulelistComponent, data: { title: "Building Schedule List" } },
      { path: 'ehc1heatingenergy', component: Ehc1heatingenergyComponent, data: { title: "Heating Energy Result" } },
      { path: 'createdesign/:projectid', component: BuildinginfoComponent, data: { title: "Create a design" } },
      { path: 'buildingschedule', component: BuildingscheduleComponent, data: { title: 'Building Schedule' } },
      { path: 'setting', data: {title: 'Setting'}, component: SettingComponent}
    ]
  },
  { path: 'register', component: RegisterComponent, data: { title: "Register" } },
  { path: 'passwordreset', component: ForgotpasswordComponent, data: { title: "Reset Password" } },
  { path: 'notfound', component: Notfound404Component, data: {title: "Not Found"}},
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
