import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  userDetail: any;

  constructor(
    public authService: AuthService,
  ){}

  
  ngOnInit(): void {
    
    this.userDetail = this.authService.getUserDetail();
  }
}
