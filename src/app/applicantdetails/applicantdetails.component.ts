import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Applicant } from 'src/Applicant';
import { DataService } from '../data.service';
import { Activity } from 'src/Activity';
import { ApplicantService } from '../applicant.service';
import { ActivityRecord } from 'src/ActivityRecord';
import { element } from '@angular/core/src/render3';
@Component({
  selector: 'app-applicantdetails',
  templateUrl: './applicantdetails.component.html',
  styleUrls: ['./applicantdetails.component.scss']
})
export class ApplicantdetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,private applicantService:ApplicantService, private dataService: DataService) { }
  applicant:Applicant=new Applicant();
  applicantid:number
  noElements:boolean=false;
  activities:Activity[] = [];
  activitesAddByAdmin:Activity[] = [];
  activitiesRecord:ActivityRecord[] ;
  selectedStatus:string;
  totalPoint:number=0;
  showRecordBlock:boolean=false;
  showAdd:boolean=true;
  activeRecord:string="active"
  activeAdd:string="";
  addedActivities:string[]=[];
  getActivities:string[]=[];
  canBeAddedActivities:Activity[]=[];
  newActivity:ActivityRecord = new ActivityRecord();
  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }
    else{
      this.route.params.subscribe((params)=>{
        if(params['id'] != undefined){
         this.applicantid=params['id']
         this.getApplicant();
        }
      })
    }
  }

  getApplicant(){
      this.dataService.getApplicant(this.applicantid).subscribe((applicant)=>{
        if(applicant==null){
         this.noElements=true;
         this.applicant = new Applicant();
        }
         else{
           this.applicant = applicant
           this.applicantService.getApplicantActivities(this.applicant.level.id, this.applicant.batch.id).subscribe((response) =>{
              this.activities = response;
              //all the activities of the employee id
            this.applicantService.getApplicantActivityRecord(this.applicantid).subscribe((response)=>{
              this.activitiesRecord = response;
              this.countTotalPoints()
              this.getNotPerformedActivities();
            })
           })
         }
      })
  }
  getNotPerformedActivities(){
    this.activities.forEach( element => {
        this.getActivities.push(element.id)
    })
    this.activitiesRecord.forEach( element => {
      this.addedActivities.push(element.activity.id)
    })

    let missing = this.getActivities.filter(item => this.addedActivities.indexOf(item) < 0);
    this.activities.forEach( activityElement => {
        missing.forEach( canBeAddedElement => {
          if(canBeAddedElement == activityElement.id){
            this.canBeAddedActivities.push(activityElement)
          }
        })
    })

    console.log("can be added array "+this.canBeAddedActivities.length)
  }
  countTotalPoints(){
    this.activitiesRecord.forEach( element =>{
      this.totalPoint = this.totalPoint+ element.points;
    })

  }
  takeScore(status:string, id:number){
    this.selectedStatus = status;
    console.log("staus is :- "+ status+" for inputt boxid "+ id)
      if(status.toUpperCase() == "COMPLETED"){
        (document.getElementById("score-"+id) as HTMLInputElement).disabled = false;
        (document.getElementById("updateButton-"+id) as HTMLButtonElement).disabled = false;
      }
      else if(status.toUpperCase() == "REVIEW FAILED"){
        (document.getElementById("score-"+id) as HTMLInputElement).disabled = true;
        (document.getElementById("updateButton-"+id) as HTMLButtonElement).disabled = false;

      }
    }

    updateApplicantRecord(id:number,index:number){
      var percentage = (document.getElementById("score-"+id) as HTMLInputElement).value;
      this.activitiesRecord[index].percentage = parseInt(percentage);
      this.activitiesRecord[index].status = this.selectedStatus;
      this.applicantService.updateActivityRecordByAdmin(this.activitiesRecord[index]).subscribe((response) =>{
        if(response != "error")
          console.log("done")
          else
           console.log("error")
      })

    }
showRecordsBlock(){
  this.showRecordBlock = false;
  this.showAdd = true;
  this.activeRecord="active"
  this.activeAdd=""
}
showAddBlock(){
  this.showRecordBlock = true;
  this.showAdd = false;
  this.activeRecord=""
  this.activeAdd="active"
  }

  addActivity(activityId:string){
    console.log("added:- "+ activityId)
    var activity = new Activity();
    this.activities.forEach(element => {
        if(element.id == activityId){
          activity = element
        }
    })
  this.newActivity.activity.id = activityId;
  this.newActivity = new ActivityRecord();
  this.newActivity.activity = activity;
  this.newActivity.applicant = this.applicant;
  this.newActivity.levelId =  activity.level.id;
  this.newActivity.status = "PLANNED";
  this.newActivity.attempts = activity.maxQualificationPoints;
  this.applicantService.addActivityRecord(this.newActivity).subscribe((response)=>{
   if(response!=null){
     console.log("added");
     (document.getElementById(activityId) as HTMLButtonElement).innerHTML = "ASSIGNED"
   }
  });
  }

}
