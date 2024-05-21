import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../services/app.layout.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
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
