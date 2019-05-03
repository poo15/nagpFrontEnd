import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Batch } from '../../../Batch';
import { Router } from '@angular/router';
import { Applicant } from 'src/Applicant';
@Component({
  selector: 'app-applicant-add',
  templateUrl: './applicant-add.component.html',
  styleUrls: ['./applicant-add.component.scss']
})
export class ApplicantAddComponent implements OnInit {
  applicant:Applicant=new Applicant();
  batches:Batch[];
  addStatus:boolean=false;
  errorStatus:boolean=false;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }else{
      this.dataService.getBatches().subscribe( (result)=>{
        this.batches = result;
      })
    }
  }

  addApplicant(){
    this.applicant.batch.id= (document.getElementById("batch") as HTMLInputElement).value;
    this.dataService.addApplicant(this.applicant).subscribe( response => { console.log(response)
      if(response != "error"){
        this.applicant.applicantId=null;
        this.applicant.contactNo=null;
        this.applicant.email=null;
        this.applicant.name=null;
        this.addStatus = true;
        this.errorStatus = false;
      }  
     else{
      this.errorStatus = true;
      this.addStatus = false;
     }
    });
    }
}
