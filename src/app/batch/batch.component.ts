import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Batch } from '../../Batch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {
  batches:Batch[]
  noElements:boolean=false
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }else{
      this.dataService.getBatches().subscribe( (result)=>{
        this.batches = result;
        if(this.batches.length == 0)
          this.noElements=true;
      })
    }
  }
  edit(id){
    console.log(id)
    this.router.navigate([`admin/batch/edit/${id}`]);
  }
}
