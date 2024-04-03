import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    HttpClientModule  
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent{
  // valCheck: string[] = ['remember'];
  // password!: string;

  loginObj: Login;

  constructor(public layoutService: LayoutService, private http: HttpClient){
    this.loginObj = new Login();
  }

  onLogin(){
    debugger;
    this.http.post('url goes here', this.loginObj).subscribe((result:any) =>{
      if(result.result){
        alert("Login Success")
      } else {
        alert(result.message)
      }
    });
  }
}

export class Login{
    EmailId: string;
    Password: string;
    constructor(){
      this.EmailId = '';
      this.Password = '';
}


// userlogin:FormGroup|any;

//   ngOnInit(): void {
    
//   }
//   userlogindata(userlogin:FormGroup){

//   }
}
