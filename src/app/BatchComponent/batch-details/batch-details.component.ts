import { Component, OnInit } from '@angular/core';
import { Batch } from '../../../Batch';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-batch-details',
  templateUrl: './batch-details.component.html',
  styleUrls: ['./batch-details.component.scss']
})
export class BatchDetailsComponent implements OnInit {
  batch:Batch;
  errorStatus:boolean = false;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }
  }
  getBatch(form){
    this.dataService.getBatch(form.value.id).subscribe( (batch) => {
      if(batch != null ){
      this.batch=batch 
    } else{
        this.errorStatus=true;
    }
    })
}
}
