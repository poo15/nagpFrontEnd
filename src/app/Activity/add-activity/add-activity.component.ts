import { Component, OnInit } from '@angular/core';
import { Batch } from '../../../Batch';
import { Level } from '../../../Level';
import { DataService } from '../../data.service';
import { Activity } from '../../../Activity';
import { Router } from '@angular/router';
import { parse } from 'url';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {

  activity:Activity=new Activity();
  noElements:boolean=false;
  batches:Batch[];
  levels:Level[];
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
      this.dataService.getAllLevels().subscribe( (result) => {
        this.levels = result;
      })
      
    }
  }

  addActivity(){
    this.activity.batch.id = (document.getElementById("batch") as HTMLInputElement).value;
    this.activity.level.id = (document.getElementById("level") as HTMLInputElement).value;
    var value = ( document.getElementById("mamdatory") as HTMLInputElement).value;
    if(value == "true")
      this.activity.optional = true
    else
    this.activity.optional = false;
    this.dataService.addActivity(this.activity).subscribe( response => { console.log(response)
      if(response != "error"){
       this.activity.id = null;
       this.activity.name = null;
       this.activity.points = null;
       this.activity.maxQualificationPoints = null;
       this.activity.description = null;
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
