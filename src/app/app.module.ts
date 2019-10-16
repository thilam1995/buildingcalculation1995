import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SuiModule} from 'ng2-semantic-ui';
import { MatStepperModule } from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LocationService } from './service/location.service';
import { ClimateService } from './service/climate.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { BuildinginfoComponent } from './components/buildinginfo/buildinginfo.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { WallformComponent } from './components/wallform/wallform.component';
import { DoorformComponent } from './components/doorform/doorform.component';
import { WindowformComponent } from './components/windowform/windowform.component';
import { HomeComponent } from './components/home/home.component';
import { BuildingscheduleComponent } from './components/buildingschedule/buildingschedule.component';
import { BuildingmodelComponent } from './components/buildingmodel/buildingmodel.component';
import { MenuComponent } from './components/menu/menu.component';
import { WalldoorwindowmodelComponent } from './components/walldoorwindowmodel/walldoorwindowmodel.component';
import { WalldoorwindowService } from './service/walldoorwindow.service';
import { BuildingschedulelistComponent } from './components/buildingschedulelist/buildingschedulelist.component';
import { BuildingscheduleitemComponent } from './components/buildingscheduleitem/buildingscheduleitem.component';
import { FloorsformComponent } from './components/floorsform/floorsform.component';
import { HeatlossComponent } from './components/heatloss/heatloss.component';
import { RoofskylightmodelComponent } from './components/roofskylightmodel/roofskylightmodel.component';
import { FloormodelComponent } from './components/floormodel/floormodel.component';
import { HeatlossroofskylightComponent } from './components/heatlossroofskylight/heatlossroofskylight.component';
import { HeatlossfloorComponent } from './components/heatlossfloor/heatlossfloor.component';
import { ProjectComponent } from './components/project/project.component';
import { Ehc1heatingenergyComponent } from './components/ehc1heatingenergy/ehc1heatingenergy.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginserviceService } from './service/loginservice.service';
import { ProjectformComponent } from './components/projectform/projectform.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordcryptService } from './service/passwordcrypt.service';
import { HomelayoutComponent } from './components/homelayout/homelayout.component';
import { ProjectService } from './service/project.service';
import { DesignService } from './service/design.service';
import { FloorService } from './service/floor.service';
import { RoofskylightService } from './service/roofskylight.service';
import { BuildingmodelService } from './service/buildingmodel.service';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { WalldoorwindowmodelitemComponent } from './components/walldoorwindowmodelitem/walldoorwindowmodelitem.component';
import { RoofskylightmodelitemComponent } from './components/roofskylightmodelitem/roofskylightmodelitem.component';
import { FloormodelitemComponent } from './components/floormodelitem/floormodelitem.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfilesettingComponent } from './components/profilesetting/profilesetting.component';
import { PasswordchangeComponent } from './components/passwordchange/passwordchange.component';
import { ProjectfilterpipePipe } from './pipe/projectfilterpipe.pipe';
import { RoofformComponent } from './components/roofform/roofform.component';
import { SkylightformComponent } from './components/skylightform/skylightform.component';
import { Notfound404Component } from './components/notfound404/notfound404.component';
import { RecentprojectComponent } from './components/recentproject/recentproject.component';
import { SortbydatePipe } from './pipe/sortbydate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    BuildinginfoComponent,
    WallformComponent,
    DoorformComponent,
    WindowformComponent,
    HomeComponent,
    BuildingscheduleComponent,
    BuildingmodelComponent,
    MenuComponent,
    WalldoorwindowmodelComponent,
    BuildingschedulelistComponent,
    BuildingscheduleitemComponent,
    FloorsformComponent,
    HeatlossComponent,
    RoofskylightmodelComponent,
    FloormodelComponent,
    HeatlossroofskylightComponent,
    HeatlossfloorComponent,
    ProjectComponent,
    Ehc1heatingenergyComponent,
    LoginComponent,
    ProjectformComponent,
    RegisterComponent,
    HomelayoutComponent,
    ForgotpasswordComponent,
    WalldoorwindowmodelitemComponent,
    RoofskylightmodelitemComponent,
    FloormodelitemComponent,
    SettingComponent,
    ProfilesettingComponent,
    PasswordchangeComponent,
    ProjectfilterpipePipe,
    RoofformComponent,
    SkylightformComponent,
    Notfound404Component,
    RecentprojectComponent,
    SortbydatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    CommonModule,
    MatStepperModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    SuiModule,
    NgbPaginationModule,
    MatTooltipModule
  ],
  providers: [LocationService, ClimateService, 
    WalldoorwindowService, AuthGuard, LoginserviceService,
    PasswordcryptService, ProjectService, DesignService, FloorService
    , WalldoorwindowService, RoofskylightService, BuildingmodelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
