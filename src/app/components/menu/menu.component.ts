import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LayoutService } from '../../services/app.layout.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    SidebarModule,
    RippleModule,
    RouterModule,
    CommonModule
],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  menuItems: any[] = [];

  constructor(
    public routerLink: RouterLink,
    public layoutService: LayoutService
    
  ){}

  ngOnInit() {
    this.menuItems = [
      {
        label:'test',
        items: [
          { label: 'Test1', icon:'pi pi-fw pi-home', routerLink: ['/']}
        ]
      }
    ]
  }

}
