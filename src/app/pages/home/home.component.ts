import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProjectListServiceService } from '../../services/ProjectServices/project-list-service.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterLink, CardModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  userDetail: any;
  products: any[] = [];
  projects: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private projectService: ProjectListServiceService
  ) {}

  ngOnInit(): void {

    this.userDetail = this.authService.getUserDetail();

    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });

    this.products = [
      { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 100 },
      { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 200 },
      { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 300 },
      { id: 4, name: 'Product 4', description: 'Description for Product 4', price: 400 },
      { id: 5, name: 'Product 5', description: 'Description for Product 5', price: 500 },
    ];

  }
  
  testToast() {
    this.messageService.add({ severity: 'info', summary: 'Test', detail: 'This is a test message' });
    console.log('Clicked testToast button');
  }

  ngAfterViewInit(): void {
    const toastMessage = history.state.toastMessage;
    console.log('Received toast message:', toastMessage);
    console.log(toastMessage);
          
    if (toastMessage) {
          this.messageService.add(toastMessage);
        }
  }

  handleButtonClick(project: any, action: string): void {
    console.log(`${action} clicked for`, project);
    // Handle the button click action here
  }
  
}

