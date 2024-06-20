import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ToastDemoComponent } from './pages/toast-demo/toast-demo.component';
import { LoginComponent } from './pages/login/login.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, MatButtonModule, NavbarComponent, ToastDemoComponent, LoginComponent]
})
export class AppComponent {
  title = 'TimeSheetWebApp';
}
