import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Level } from '../../Level';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  noElements:boolean=false;
  levels:Level[];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('user')==null && localStorage.getItem('role') != 'ADMIN'){
      this.router.navigate(['']);
    } else{
      this.dataService.getAllLevels().subscribe( levels => {
        this.levels = levels;
        if(this.levels.length == 0)
          this.noElements=true;
      })
    }
  }
  edit(id){
    this.router.navigate([`admin/level/edit/${id}`]);
  }
}
