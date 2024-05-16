import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterLink],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userDetail: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Retrieve user details
    this.userDetail = this.authService.getUserDetail();

    // Check for toast message in navigation state
    const toastMessage = history.state.toastMessage;
    console.log('Received toast message:', toastMessage);

    if (toastMessage) {
      this.messageService.add(toastMessage);
    }
  }

  testToast() {
    this.messageService.add({ severity: 'info', summary: 'Test', detail: 'This is a test message' });
    console.log('Clicked testToast button');
  }
}
