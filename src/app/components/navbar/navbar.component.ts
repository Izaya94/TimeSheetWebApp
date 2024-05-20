import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu'
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutService } from "../../services/app.layout.service";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { IMenuBarItems } from '../../interfaces/user-menu-items';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MenubarModule, CommonModule, ToastModule, RouterModule],
  providers: [MessageService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  menuBarItems!: IMenuBarItems[]; 
  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

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
}
