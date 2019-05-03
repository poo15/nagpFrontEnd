import { Component, OnInit } from '@angular/core';
import { User } from '../../User'
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorStatus: boolean;
  constructor(private dataService: DataService, private router: Router) { }
  logged:any;
  ngOnInit() {
  }

  login(frm){
    this.errorStatus = false;
    let user:User = {
      name: frm.value.name,
      password: frm.value.password
    }
    console.log(frm.value.name+" *** "+frm.value.password)

    this.dataService.login(user).subscribe(loggedUser => {
      this.logged = loggedUser
      
      if(this.logged != null ){
        
        if(this.logged.roles!=undefined && this.logged.roles[0].role == 'ADMIN'){
          localStorage.setItem('role', 'ADMIN');
          localStorage.setItem('user', JSON.stringify(this.logged))
          this.router.navigate(['/admin'])
        }
        else if(this.logged.user!=undefined && this.logged.user.roles[0].role == 'APPLICANT'){
          localStorage.setItem('role', 'APPLICANT');
          localStorage.setItem('user', JSON.stringify(this.logged))
          this.router.navigate(['/applicant'])
        }
        else
        this.setError()

      }else{
        this.setError()
      }
      
    })
  }

  setError(){
    this.errorStatus = true;
        this.router.navigate([''])
  }
}
