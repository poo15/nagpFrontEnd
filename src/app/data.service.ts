import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../User';
import { Level } from '../Level';
import { Batch } from '../Batch';
import { Applicant } from '../Applicant';
import { Activity } from '../Activity';
import { BehaviorSubject } from 'rxjs';
const httpOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};



@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  //  applicant:any = new Applicant();
  //  currentApplicant = this.applicant.Observable();
  
  constructor(private http: HttpClient) { }

  //User Login
  login(user:User):Observable<User>{
    return this.http.post<User>('http://localhost:8080/userLogin/',user,httpOption);
  }


  //Level Service function
  getAllLevels():Observable<Level[]>{
    console.log("in service");
    return this.http.get<Level[]>('http://localhost:8080/admin/level');
  }
  
  //add level
  addLevel(level:Level){
    return this.http.post('http://localhost:8080/admin/level',level,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }

  //get level details
  getLevel(id:string):Observable<Level>{
    return this.http.get<Level>(`http://localhost:8080/admin/level/${id}`);
  }

  //update level details

  editLevel(id:string,level:Level){
    console.log("in service:- "+ id)
    return this.http.put(`http://localhost:8080/admin/level/${id}`,level,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }


  //get batched
    getBatches():Observable<Batch[]>{
      return this.http.get<Batch[]>('http://localhost:8080/admin/batch');
    }
  //add batch
  addBatch(batch:Batch){
    return this.http.post('http://localhost:8080/admin/batch',batch,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
  });
  }

  //get batch details
  getBatch(id:string):Observable<Batch>{
    return this.http.get<Batch>(`http://localhost:8080/admin/batch/${id}`);
  }
   //update batch details

   editBatch(id:string,batch:Batch){
    return this.http.put(`http://localhost:8080/admin/batch/${id}`,batch,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }

  //add applicant

  addApplicant(applicant:Applicant){
    return this.http.post('http://localhost:8080/applicant/admin',applicant,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
  });
  }

  //get All applicant
  getApplicants():Observable<Applicant[]>{
    return this.http.get<Applicant[]>('http://localhost:8080/applicant/admin');
  }

  getApplicant(id:number):Observable<Applicant>{
    return this.http.get<Applicant>(`http://localhost:8080/applicant/${id}`);
  }

  //get All activity
  getActivities():Observable<Activity[]>{
    return this.http.get<Activity[]>('http://localhost:8080/activity/admin');
  }

  //add activity

  addActivity(activity:Activity){
    return this.http.post('http://localhost:8080/activity/admin',activity,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
  });
  }

  //update activity details

  editActivity(id:string,activity:Activity){
    return this.http.put(`http://localhost:8080/activity/admin/${id}`,activity,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   });
  }

  //get activity details
  getActivity(id:string):Observable<Activity>{
    return this.http.get<Activity>(`http://localhost:8080/activity/admin/${id}`);
  }

  //common share service

  // changeMessage(applicantExchange: Applicant) {
  //   this.applicant = applicantExchange;
  // }

}
