import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarInsertService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ){}
  

  addEmployeeCalendarWork(formData: any): Observable<any> {

    console.log('Original formData:', formData);
     // Convert start and end time to decimal with 2 max numbers after the point
     formData.workStart = this.dateToDecimal(formData.workStart);
     formData.workEnd = this.dateToDecimal(formData.workEnd);
     // Convert selected date to a format suitable for SQL Server (e.g., YYYY-MM-DD)
     formData.selectedDate = this.formatDateForSQL(formData.selectedDate);

    console.log('Modified formData:', formData);
    return this.http.post(`${this.apiUrl}`, formData);
    
  }

  // Function to convert date to decimal with 2 max numbers after the point
  private dateToDecimal(date: Date): number {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const decimalTime = hours + minutes / 60;
    return parseFloat(decimalTime.toFixed(2));
  }

  // Function to format date for SQL Server (dd-mm-yyyy)
  public formatDateForSQL(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

}
