import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NotificationService } from '../notification.service';
import { Notification } from '../../Notification';
@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent implements OnInit {
  userName:string;
  notification:Notification[] = [];
  role:string;
  constructor( private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    
    if(localStorage.getItem('user')==null){
      this.router.navigate(['']);
    }
    else{
    this.userName = JSON.parse(localStorage.getItem('user')).name;
    this.role = localStorage.getItem('role');
    if(this.role == 'ADMIN'){
        this.notificationService.getNotifications().subscribe((response)=>{
          this.notification =response;
          console.log("Total notifications:- "+ this.notification.length)
        })
    }
    }
  }

}
