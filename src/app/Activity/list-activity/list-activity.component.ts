import { Component, OnInit } from '@angular/core';
import { Batch } from '../../../Batch';
import { Level } from '../../../Level';
import { DataService } from '../../data.service';
import { Activity } from '../../../Activity';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.scss']
})
export class ListActivityComponent implements OnInit {
  activities:Activity[];
  noElements:boolean=false;
  batches:Batch[];
  levels:Level[];
  filteredActivities:Activity[];
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
        this.getAllRecords();
    }
  }

  getAllRecords(){
    this.dataService.getActivities().subscribe( (result)=>{
      this.filteredActivities = result;
      this.activities = result;
      this.noElements=false;
      this.checkRecordsPresent();
    })
  }

  checkRecordsPresent(){
    if(this.filteredActivities.length==0)
          this.noElements=true;
  }
  filterByBatch(value:string) {
    this.noElements = false;
    this.filteredActivities = [];
    this.activities.forEach(element => {
      if(element.batch.id === value){
        this.filteredActivities.push(element);
      }
    });
    this.checkRecordsPresent();
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
  clear(){
    
    this.getAllRecords()
  }

  edit(id){
    console.log(id)
    this.router.navigate([`admin/activity/edit/${id}`]);
  }
}
