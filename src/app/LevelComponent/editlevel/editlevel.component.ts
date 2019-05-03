import { Component, OnInit } from '@angular/core';
import {Level } from '../../../Level';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-editlevel',
  templateUrl: './editlevel.component.html',
  styleUrls: ['./editlevel.component.scss']
})
export class EditlevelComponent implements OnInit {

  level:Level;
  levelId:string;
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
         this.levelId=params['id']
         this.getLevel()
        }
      })
    }
  }
  getLevel(){
    console.log(this.levelId)
      this.dataService.getLevel(this.levelId).subscribe( (level) => {
        console.log("searched level:- "+ JSON.stringify(level))  
              if(level != null ){
                this.level=level 
      } else{
          this.errorStatus=true;
      }
      })
  }
  editLevel(){
   
    this.dataService.editLevel(this.levelId,this.level).subscribe( response => {
        if(response != "error"){
          this.updateStatus = true;
          this.level=null;
          this.levelId=null;
        }  
    })
  }
}
