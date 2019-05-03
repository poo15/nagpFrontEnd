import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../applicant.service';
import { Level } from '../../../Level';
import { DataService } from '../../data.service';
import { Activity } from '../../../Activity';
import { Router } from '@angular/router';
import { Applicant } from 'src/Applicant';

@Component({
  selector: 'app-applicant-activities',
  templateUrl: './applicant-activities.component.html',
  styleUrls: ['./applicant-activities.component.scss']
})
export class ApplicantActivitiesComponent implements OnInit {
  activities:Activity[];
  noElements:boolean=false;
  applicant:Applicant;
  levels:Level[];
  filteredActivities:Activity[];

  constructor(private dataService: DataService, private router: Router, private applicantService:ApplicantService) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }else{
      this.applicant = JSON.parse(localStorage.getItem('user'))
      console.log(this.applicant.batch.id+" "+this.applicant.level.id)
      this.dataService.getAllLevels().subscribe( (result) => {
        this.levels = result;
      })
        this.getAllActivities();
    }
  }
  getAllActivities(){

     this.applicantService.getApplicantActivities(this.applicant.level.id, this.applicant.batch.id).subscribe((response) =>{
      this.filteredActivities = response;
      this.activities = response;
      this.noElements=false;
      this.checkRecordsPresent();
     })


  }

  filterByLevel(value:string) {
    this.noElements = false;
    this.filteredActivities = [];
    this.activities.forEach(element => {
      if(element.level.id === value){
        this.filteredActivities.push(element);
      }
    });
    this.checkRecordsPresent();
  }

  filterByName(value:string){
    console.log(value)
    this.noElements = false;
    this.filteredActivities = [];
    this.activities.forEach(element => {
      if(element.name.toLowerCase() === value.toLowerCase()){
        this.filteredActivities.push(element);
      }
    });
    this.checkRecordsPresent();
  }
  
  checkRecordsPresent(){
    if(this.filteredActivities.length==0)
          this.noElements=true;
  }
  clear(){
    
    this.getAllActivities()
  }
  detail(id){
    this.router.navigate([`applicant/details/${id}`]);
  }
}
