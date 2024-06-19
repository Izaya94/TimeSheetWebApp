import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LayoutService } from "../../services/app.layout.service";
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import { SidebarService } from '../../services/sidebar.service';
// import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MenubarModule, CommonModule, ToastModule, RouterModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  
  menuBarItems: MenuItem[] = []; 

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.menuBarItems = [
      {
        label: 'View Profile',
        icon: 'pi pi-user',
        routerLink: ['/account']
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout = () =>{
    this.authService.logout();
    this.router.navigate(['/login']);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logged out successfully.' });
  };

  testToast() {
    this.messageService.add({ severity: 'info', summary: 'Test', detail: 'This is a test message' });
    console.log('Clicked testToast button');
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
