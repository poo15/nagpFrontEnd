import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/Batch';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batch-add',
  templateUrl: './batch-add.component.html',
  styleUrls: ['./batch-add.component.scss']
})
export class BatchAddComponent implements OnInit {
  batch:Batch = new Batch();
  addStatus:boolean=false;
  errorStatus:boolean = false
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }
  }

  addBatch(){
   
    console.log(this.batch)
    this.dataService.addBatch(this.batch).subscribe((response) => { console.log(response)
      if(response!="error"){
      this.addStatus=true;
      this.batch.date=null;
      this.batch.description=null;
      this.batch.id=null;
      this.batch.qualificationPoint=null;
      this.batch.technology=null;
      this.batch.year=null;
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
