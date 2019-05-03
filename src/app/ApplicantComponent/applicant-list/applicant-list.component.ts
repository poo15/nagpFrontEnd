import { Component, OnInit } from '@angular/core';
import { Batch } from '../../../Batch';
import { Applicant } from '../../../Applicant';
import { Level } from '../../../Level';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { _document } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit {
  p: number = 1;
  applicants:Applicant[];
  batches:Batch[];
  levels:Level[];
  filteredApplicants:Applicant[];
  noElements:boolean=false;
  constructor(private dataService: DataService, private router: Router) { }


  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }else{
      this.dataService.getBatches().subscribe( (result)=>{
        this.batches = result;
      })
      this.dataService.getAllLevels().subscribe( (result) => {
        this.levels = result;
      })
     this.getAllRecords()
     
    }
  }

  getAllRecords(){
    this.dataService.getApplicants().subscribe( (result)=>{
      this.filteredApplicants = result;
      this.applicants = result;
      this.noElements=false;
      this.checkRecordsPresent();
    })
  }

  checkRecordsPresent(){
    if(this.filteredApplicants.length==0)
          this.noElements=true;
  }

  filterByBatch(value:string) {
    this.noElements = false;
    this.filteredApplicants = [];
    this.applicants.forEach(element => {
      if(element.batch.id === value){
        this.filteredApplicants.push(element);
      }
    });
    this.checkRecordsPresent();
  }
  filterByLevel(value:string) {
    this.noElements = false;
    this.filteredApplicants = [];
    this.applicants.forEach(element => {
      if(element.level.id === value){
        this.filteredApplicants.push(element);
      }
    });
    this.checkRecordsPresent();
  }

  filterByStatus(value:string) {
    this.noElements = false;
    this.filteredApplicants = [];
    this.applicants.forEach(element => {
      if(element.status === value){
        this.filteredApplicants.push(element);
      }
    });
    this.checkRecordsPresent();
  }

  filterByName(value:string){
    this.noElements = false;
    this.filteredApplicants = [];
    this.applicants.forEach(element => {
      if(element.name.toLowerCase() === value.toLowerCase()){
        this.filteredApplicants.push(element);
      }
    });
    this.checkRecordsPresent();
  }

  filterById(value:string){
    console.log(value)
    this.noElements = false;
    this.filteredApplicants = [];
    this.applicants.forEach(element => {
      if(element.applicantId == parseInt(value)){
        this.filteredApplicants.push(element);
      }
    });
    console.log(this.filteredApplicants)
    this.checkRecordsPresent();
  }


  sortByName(){
    this.filteredApplicants.sort((n1,n2)=> n1.name < n2.name ? -1 : n1.name > n2.name ? 1 : 0);
 
  }

  sortById(){
   this.filteredApplicants.sort((n1,n2)=> n1.applicantId < n2.applicantId ? -1 : n1.applicantId > n2.applicantId ? 1 : 0);
  }

  clear(){
    
    this.getAllRecords()
  }

  details(id){

    this.router.navigate([`admin/applicant/details/${id}`]);
  }

}
