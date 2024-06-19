import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IEmployeeCalendarDTODelete } from '../../interfaces/EmployeeCalendar/EmployeeCalendarDelete';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarDeleteService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ){}

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
  deleteEmployeeCalendarData(record: any): Observable<IEmployeeCalendarDTODelete> {
      console.log(record);
      const employeeCalendarId = record.employeeCalendarId;
      console.log(employeeCalendarId);
      return this.http.post<IEmployeeCalendarDTODelete>(`${this.apiUrl}EmployeeCalendar/Delete/${employeeCalendarId}`, record, { headers: this.getAuthHeaders()});
    }

}
