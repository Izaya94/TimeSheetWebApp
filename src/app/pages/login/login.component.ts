import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink, ButtonModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,
    // private matSnackBar: MatSnackBar
  ) {}

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: '123'});
  }


  hide = true;
  loginForm!: FormGroup;


    // this.authService.login(this.loginForm.value).subscribe((response) => {console.log(response);}); 


    ngOnInit():void{
      this.loginForm = this.fb.group({
        email:['', [Validators.required, Validators.email]],
        password:['',Validators.required],
      });
      this.messageService.add({ severity: 'info', summary: 'Test', detail: 'This is a test message' });
    }
    
    login() {
      if (this.loginForm.valid) {
        console.log('Login form is valid');
        this.authService.login(this.loginForm.value).subscribe({
          
          next: (response) => {
            if (response.flag == true){
            const navigationExtras: NavigationExtras = {
              state: {
                toastMessage: {
                    severity: 'success',
                    summary: 'Success',
                    detail: response.message,
                  },
                },
              };
              this.router.navigate(['/'], navigationExtras);
            }     
            else if (response.flag == false){
                this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
                // this.router.navigate(['/login']);
              }
            }
          })
        };
      }

    testToast() {
      this.messageService.add({ severity: 'info', summary: 'Test', detail: 'This is a test message' });
      console.log('clicked');
    }
    
  // login(){
  //   this.authService.login(this.loginForm.value).subscribe({
  //     next:(response) => {
  //       this.messageService.add({severity:'success', summary: 'Success', detail: response.message});
  //       this.router.navigate(['/']);
  //     },
  //     error: (error) => {
  //       this.messageService.add({severity:'error', summary: 'Error', detail: error.error.message});
  //     },
  //   });
  // }

  // login(){
  //   // this.authService.login(this.loginForm.value).subscribe((response) => {console.log(response);}); 
  //   this.authService.login(this.loginForm.value).subscribe({
  //     next:(response) => {
  //       this.matSnackBar.open(response.message, 'Close',{
  //         duration:5000,
  //         horizontalPosition: 'center',
  //       });
  //       this.router.navigate(['/']);
  //     },
  //     error: (error) => {
  //       this.matSnackBar.open(error.error.message, 'Close', {
  //         duration:5000,
  //         horizontalPosition: 'center',
  //       });
  //     },
  //   });
  // }

}
