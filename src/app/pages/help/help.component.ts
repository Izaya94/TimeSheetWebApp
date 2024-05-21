import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-help',
  standalone: true,
  imports: [RouterLink, ToastModule, FileUploadModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css',
  providers: [MessageService]
})
export class HelpComponent implements OnInit{
onUpload($event: Event) {
throw new Error('Method not implemented.');
}
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
            const navigationExtras: NavigationExtras = {
              state: {
                toastMessage: {
                    severity: 'success',
                    summary: 'Success',
                    detail: response.message,
                    life: 3000,
                  },
                },
              };
              this.router.navigate(['/'], navigationExtras);
          },
          error: (error) => {
            console.log('Login error', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
            this.router.navigate(['/help']);
          }
        });
      } else {
        console.log('Login form is invalid');
        this.router.navigate(['/help']);
      }
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
