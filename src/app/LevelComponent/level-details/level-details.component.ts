import { Component, OnInit } from '@angular/core';

import {Level } from '../../../Level';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-level-details',
  templateUrl: './level-details.component.html',
  styleUrls: ['./level-details.component.scss']
})
export class LevelDetailsComponent implements OnInit {
  level:Level;
  errorStatus:boolean = false;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    }
  }
  getLevel(form){
    this.dataService.getLevel(form.value.id).subscribe( (level) => {
      if(level != null ){
      this.level=level 
    } else{
        this.errorStatus=true;
    }
    })
}
}
