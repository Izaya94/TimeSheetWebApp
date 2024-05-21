// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { SidebarModule } from 'primeng/sidebar';
// import { SidebarService } from '../../services/sidebar.service';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.css'],
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     SidebarModule
//   ]
// })
// export class SidebarComponent implements OnInit {
//   visible: boolean = false;

//   constructor(private sidebarService: SidebarService) {}

//   ngOnInit() {
//     this.sidebarService.sidebarVisible$.subscribe((visible: boolean) => {
//       this.visible = visible;
//     });
//   }

//   logout() {
//     // Implement logout logic
//   }
// }
