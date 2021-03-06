import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMessage = false;
  loginForm: FormGroup;
  errMessageStr = "Login Failed!";

  constructor(private formBuilder: FormBuilder, private api: UtilityService,private router: Router){}

  ngOnInit(): void {
    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      hostname: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    this.errMessage = false
    this.api.doLogin(this.loginForm.value).subscribe((res)=>{
      if(res.status){
        localStorage.setItem('hostname',this.loginForm.value.hostname)
        localStorage.setItem('username',this.loginForm.value.username)
        this.router.navigate(['logs'])
      }
      else{
        this.errMessage = true;
        this.errMessageStr = res.message
      }
    },(err)=>{
      this.errMessage = true;
    })
  }
}
