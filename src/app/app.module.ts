import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LevelComponent } from './level/level.component';
import { BatchComponent } from './batch/batch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataService } from './data.service';
import { ApplicantService } from './applicant.service';
//For http

import { HttpClientModule } from '@angular/common/http';
import { AddlevelComponent } from './LevelComponent/addlevel/addlevel.component';
import { EditlevelComponent } from './LevelComponent/editlevel/editlevel.component';
import { LevelDetailsComponent } from './LevelComponent/level-details/level-details.component';
import { BatchDetailsComponent } from './BatchComponent/batch-details/batch-details.component';
import { BatchEditComponent } from './BatchComponent/batch-edit/batch-edit.component';
import { BatchAddComponent } from './BatchComponent/batch-add/batch-add.component';
import { ApplicantListComponent } from './ApplicantComponent/applicant-list/applicant-list.component';
import { ApplicantAddComponent } from './ApplicantComponent/applicant-add/applicant-add.component';
import { ApplicantdetailsComponent } from './applicantdetails/applicantdetails.component';
import { AddActivityComponent } from './Activity/add-activity/add-activity.component';
import { EditActivityComponent } from './Activity/edit-activity/edit-activity.component';
import { ListActivityComponent } from './Activity/list-activity/list-activity.component';
import { ApplicantDasboardComponent } from './Applicant/applicant-dasboard/applicant-dasboard.component';
import { ApplicantActivitiesComponent } from './Applicant/applicant-activities/applicant-activities.component';
import { ApplicantDetailComponent } from './Applicant/applicant-details/applicant-details.component';
import { ApplicantProfileComponent } from './Applicant/applicant-profile/applicant-profile.component';
import { LogoutComponent } from './logout/logout.component';

    
const appRoutes: Routes = [
    { path: '' , component:LoginComponent},
    {  path: 'admin', component: AdminDashboardComponent ,
    children: [   
      { path: '' , component:DashboardComponent},   
      { path: 'level', component: LevelComponent},   
      { path: 'level/add', component: AddlevelComponent},
      { path: 'level/edit', component: EditlevelComponent},
      { path: 'level/detail', component: LevelDetailsComponent},
      { path: 'batch', component: BatchComponent },   
      { path: 'batch/add', component: BatchAddComponent},   
      { path: 'batch/edit', component: BatchEditComponent},   
      { path: 'batch/detail', component: BatchDetailsComponent},   
      { path: 'applicant', component: ApplicantListComponent},   
      { path: 'applicant/add', component: ApplicantAddComponent},
      { path: 'applicant/details', component: ApplicantdetailsComponent},
      { path: 'applicant/details/:id', component: ApplicantdetailsComponent},
      { path: 'activity', component: ListActivityComponent},
      { path: 'activity/edit', component: EditActivityComponent},   
      { path: 'activity/add', component: AddActivityComponent },
      { path: 'activity/edit/:id', component: EditActivityComponent},
      { path: 'batch/edit/:id', component: BatchEditComponent},
      { path: 'level/edit/:id', component: EditlevelComponent}
      ] 
    },
    { path: 'applicant', component: ApplicantDasboardComponent,
      children: [
          { path: '', component: ApplicantProfileComponent }, 
          { path: 'activities', component: ApplicantActivitiesComponent},
          { path: 'details', component: ApplicantDetailComponent},
          { path: 'details/:id', component: ApplicantDetailComponent}
      ]
    },
    { path: 'logout', component: LogoutComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LevelComponent,
    BatchComponent,
    DashboardComponent,
    AdminDashboardComponent,
    LoginComponent,
    TopNavbarComponent,
    AddlevelComponent,
    EditlevelComponent,
    LevelDetailsComponent,
    BatchDetailsComponent,
    BatchEditComponent,
    BatchAddComponent,
    ApplicantListComponent,
    ApplicantAddComponent,
    ApplicantdetailsComponent,
    AddActivityComponent,
    EditActivityComponent,
    ListActivityComponent,
    ApplicantDasboardComponent,
    ApplicantActivitiesComponent,
    ApplicantDetailComponent,
    ApplicantProfileComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes 
    )
  ],
  providers: [DataService, ApplicantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
