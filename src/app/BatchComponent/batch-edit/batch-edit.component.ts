import { Component, OnInit } from '@angular/core';

import { Batch } from '../../../Batch';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-batch-edit',
  templateUrl: './batch-edit.component.html',
  styleUrls: ['./batch-edit.component.scss']
})
export class BatchEditComponent implements OnInit {
  batch:Batch= new Batch();
  batchId:string;
  errorStatus:boolean = false;
  updateStatus:boolean = false;
  constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }
    else{
      this.route.params.subscribe((params)=>{
        if(params['id'] != undefined){
         this.batchId=params['id']
         this.getBatch()
        }
      })
    }
  }

  getBatch(){
    this.dataService.getBatch(this.batchId).subscribe( (batch) => {
      if(batch != null ){
      this.batch=batch 
    } else{
        this.errorStatus=true;
    }
    })
  }

  editBatch(){
    console.log("edited object:- "+JSON.stringify(this.batch))
    this.dataService.editBatch(this.batchId,this.batch).subscribe( response => {
        if(response != "error"){
          this.updateStatus = true;
        }  
    })
  }
}
