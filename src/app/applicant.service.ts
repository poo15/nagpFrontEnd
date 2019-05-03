import { Injectable } from '@angular/core';
import { Applicant } from 'src/Applicant';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from 'src/Activity';
import { ActivityRecord } from 'src/ActivityRecord';

const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) { }

  activities:Observable<Activity[]>;
   //update level details

   editApplicant(id:number,applicant:Applicant){
    return this.http.put(`http://localhost:8080/applicant/${id}`,applicant,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }

  // get activities for applicants

  getApplicantActivities(levelId:string, batchId:string):Observable<Activity[]>{
    this.activities =  this.http.get<Activity[]>(`http://localhost:8080/activity/${levelId}/${batchId}`);
    return this.activities;
  }

  //get by applicant & activity Id
  getActivityRecord(applicantId:number, activityId:string){
      return this.http.get<ActivityRecord>(`http://localhost:8080/activitiesRecord/applicant/${applicantId}/${activityId}`);
  }

  //to updateActivity record
  updateActivityRecord(recordId:number, activityRecord:ActivityRecord){
    return this.http.put(`http://localhost:8080/activitiesRecord/applicant/${recordId}`, activityRecord,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   })
  }

  //To add a activity record
  addActivityRecord(activityRecord:ActivityRecord):Observable<ActivityRecord>{
    return this.http.post<ActivityRecord>('http://localhost:8080/activitiesRecord',activityRecord,httpOption);
  }

  //to get a applicant all activity record.
  getApplicantActivityRecord(applicantId:number):Observable<ActivityRecord[]>{
    return this.http.get<ActivityRecord[]>(`http://localhost:8080/activitiesRecord/applicant/${applicantId}`);
  }
  updateActivityRecordByAdmin(activityRecord:ActivityRecord){
    return this.http.put(`http://localhost:8080/activitiesRecord/admin/${activityRecord.activityRecordId}`, activityRecord,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   })
  }

}
