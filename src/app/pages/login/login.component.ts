import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink, MatSnackBarModule, ButtonModule, ToastModule,],
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);

  constructor(private authService: AuthService, private messageService: MessageService) {}

  router = inject(Router);
  hide = true;
  loginForm!: FormGroup;
  fb = inject(FormBuilder);

  login(){
    // this.authService.login(this.loginForm.value).subscribe((response) => {console.log(response);}); 
    this.authService.login(this.loginForm.value).subscribe({
      next:(response) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: response.message});
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: error.error.message});
      },
    });
  }

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

  ngOnInit():void{
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['',Validators.required],
    }) 
  }
}
