import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Applicant } from 'src/Applicant';
import { ApplicantService } from '../../applicant.service';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss']
})
export class ApplicantProfileComponent implements OnInit {

  applicant:Applicant;
  updateStatus:boolean=false;
  erroStatus:boolean = false;
  constructor(private router: Router, private applicantService: ApplicantService) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'APPLICANT'){
      this.router.navigate(['']);
    }
    else{
      this.applicant = JSON.parse(localStorage.getItem('user'));


    }
  }

  updateApplicant(){
    console.log("New Details:- "+ this.applicant)
    this.applicantService.editApplicant(this.applicant.applicantId,this.applicant).subscribe( (response)=>{
      console.log(response)
      if(response != 'error'){
        this.updateStatus = true;
      }
      else{
        this.erroStatus = true;
      }
    })
  }

}
