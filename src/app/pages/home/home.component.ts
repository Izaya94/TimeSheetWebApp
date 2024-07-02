import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProjectListService } from '../../services/ProjectServices/project-list.services';
import { ProjectDTOList } from '../../interfaces/Project/ProjectList';


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
  projects!: ProjectDTOList[];
  photos = [
    '/assets/img/photo1.jpg',
    '/assets/img/photo2.jpg',
    '/assets/img/photo3.jpg',
    '/assets/img/photo4.jpg',
    '/assets/img/photo5.jpg',
    '/assets/img/photo6.jpg',
  ]

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private projectService: ProjectListService
  ) {}

  ngOnInit(): void {

    this.userDetail = this.authService.getUserDetail();

    this.projectService.getProjectList().subscribe(data => {
      this.projects = data.projectList;
    });
  }

  getPhotoForProject(index: number): string {
    return this.photos[index % this.photos.length];
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

