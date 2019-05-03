import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';
import { ApplicantService } from '../../applicant.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/Activity';
import { Applicant } from 'src/Applicant';
import { ActivityRecord } from 'src/ActivityRecord';
@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailComponent implements OnInit {

  activities:Activity[];
  activityId:string
  hasActivities:boolean = false;
  activity:Activity= new Activity();
  errorStatus:boolean=false;
  updateStatus:boolean=false;
  applicant:Applicant=new Applicant();
  activityRecord:ActivityRecord = new ActivityRecord();
  updateRecord:ActivityRecord = new ActivityRecord();
  constructor(private applicantService:ApplicantService,private dataService: DataService, private router: Router,private route: ActivatedRoute) { }


  ngOnInit() {
    this.applicant = JSON.parse(localStorage.getItem('user'))
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }
    else{
     
        this.applicantService.getApplicantActivities(this.applicant.level.id, this.applicant.batch.id).subscribe( (activities) =>{
          this.activities = activities;
          if(this.activities.length != 0)
            this.hasActivities = true
        })
        this.route.params.subscribe((params)=>{
          if(params['id'] != undefined){
           this.activityId=params['id']
           this.getActivity(this.activityId)
          }
        })

        if(this.activityId == null){
          (document.getElementById("activityDiv") as HTMLDivElement).style.display = "none";
        }
    }
  }

  getApplicantRecords(activityId){
    this.applicantService.getActivityRecord(this.applicant.applicantId,activityId).subscribe((record)=>{
      this.activityRecord = record;
      this.updateRecord = record;
        if(this.activityRecord == null){
          this.showAddButton()
        }else if(this.activityRecord != null && this.activityRecord.status.toUpperCase() == "REVIEW FAILED")
           { 
             this.showAddButton()
           }
        else
         (document.getElementById("addActivityDiv") as HTMLDivElement).style.display = "none";
    })
    
  }

  getActivity(id){
    this.dataService.getActivity(id).subscribe( (activity) => {
        if(activity != null ){
        this.activity=activity 
        this.getApplicantRecords(id)
        
      } else{
          this.errorStatus=true;
      }
    })
    if(!this.errorStatus)
    (document.getElementById("activityDiv") as HTMLDivElement).style.display = "initial";

}

updateActivityRecord(id){
  var newStatus = (document.getElementById("status") as HTMLInputElement).value;
  if(newStatus.toLowerCase() == "in progress" && this.updateRecord.status.toLowerCase() !== "planned"){
      this.updateRecord.status = "PLANNED";
  }
  else if(newStatus.toLowerCase() == "done" && this.updateRecord.status.toLowerCase() !== "in progress"){
    this.updateRecord.status = "IN PROGRESS";
  } else
    this.updateRecord.status = newStatus;
  this.applicantService.updateActivityRecord(id,this.updateRecord).subscribe((response) =>{
    if(response!="done"){
    this.errorStatus = true;
    }else{
      this.updateStatus = true;
      this.getApplicantRecords(this.activityId)
    }
  })

}

addActivity(activityId:string){
  this.activityRecord = new ActivityRecord();
  this.activityRecord.activity = this.activity;
  this.activityRecord.applicant = this.applicant;
  this.activityRecord.levelId = this.activity.level.id;
  this.activityRecord.status = "PLANNED";
  this.activityRecord.attempts = this.activity.maxQualificationPoints;
  console.log("activity to be added"+ this.activityRecord)
  this.applicantService.addActivityRecord(this.activityRecord).subscribe((response)=>{
    if(response != null){
      this.activityRecord = response;
      
  (document.getElementById("addActivityDiv") as HTMLDivElement).style.display = "none";
    }
  });

}

showAddButton(){
  (document.getElementById("addActivityDiv") as HTMLDivElement).style.display = "inline";
}

}
