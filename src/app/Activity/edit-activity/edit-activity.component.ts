import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Activity } from 'src/Activity';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss']
})
export class EditActivityComponent implements OnInit {

  activityId:string;
  selectedActivity:boolean= true;
  activity:Activity=new Activity();
  result:Activity=new Activity();
  errorStatus:boolean=false;
  updateStatus:boolean=false;
  constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) { }


  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }else{
      this.route.params.subscribe((params)=>{
        if(params['id'] != undefined){
         this.activityId=params['id']
         this.getActivity()
        }
      })
    
    }
  }

  getActivity(){
    this.dataService.getActivity(this.activityId).subscribe( (data) => {
      if(data != null ){
      this.activity=data 
    } else{
        this.errorStatus=true;
    }
    })
  }

  editActivity(){
    this.dataService.editActivity(this.activityId,this.activity).subscribe( response => {
        if(response != "error"){
          this.activity.id = null;
          this.activity.description=null;
          this.activity.maxQualificationPoints=null;
          this.activity.points=null;
          this.activity.name=null;
          this.activityId=null;
          this.updateStatus = true;
        }  
      });
    } 
}
