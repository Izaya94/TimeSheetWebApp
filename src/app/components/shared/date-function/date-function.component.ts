import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-function',
  standalone: true,
  imports: [],
  templateUrl: './date-function.component.html',
  styleUrl: './date-function.component.css'
})
export class DateFunctionComponent {
  constructor(private http: HttpClient) {}

  saveDateTime(date: Date) {
    const utcDateTimeString = date.toISOString(); // Convert Date to ISO string in UTC
    this.http.post('/api/saveDateTime', { dateTime: utcDateTimeString })
      .subscribe(response => {
        console.log('DateTime saved successfully', response);
      });
  }
}
