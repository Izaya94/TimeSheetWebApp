import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-toast-demo',
  templateUrl: './toast-demo.component.html',
  styleUrls: ['./toast-demo.component.css'],
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService]
})
export class ToastDemoComponent {
  constructor(private messageService: MessageService) {}

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: '123'});
  }

  showInfo() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Message Content'});
  }

  showWarn() {
    this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Message Content'});
  }

  showError() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
  }
}
