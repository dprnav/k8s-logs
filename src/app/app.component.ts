import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'k8s-logs';

  constructor(public router: Router,private api: UtilityService){

  }

  logout(){
    let data = {
      username: localStorage.getItem('username'),
      hostname: localStorage.getItem('hostname')
    }
    this.api.logout(data).subscribe((res)=>{
      localStorage.clear();
      this.router.navigate(['login'])
    },(err)=>{
      localStorage.clear();
      this.router.navigate(['login'])
    });
  }
}
