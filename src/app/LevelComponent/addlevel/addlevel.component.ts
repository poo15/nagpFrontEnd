import { Component, OnInit } from '@angular/core';
import {Level } from '../../../Level';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addlevel',
  templateUrl: './addlevel.component.html',
  styleUrls: ['./addlevel.component.scss']
})
export class AddlevelComponent implements OnInit {
  level:Level = new Level();
  addStatus:boolean=false;
  errorStatus:boolean=false;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }
  }
  addLevel(){
    this.dataService.addLevel(this.level).subscribe( (response)=>{
      if(response != "error"){
        this.level.description = null;
        this.level.id = null;
        this.level.name = null;
        this.level.number = null;
        this.level.qualificationPoint = null;
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
