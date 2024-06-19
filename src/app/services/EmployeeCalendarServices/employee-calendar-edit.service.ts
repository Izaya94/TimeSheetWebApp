import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IEmployeeCalendarDTOEdit } from '../../interfaces/EmployeeCalendar/EmployeeCalendarUpdate';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarEditService {

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
  updateEmployeeCalendarData(record: any): Observable<IEmployeeCalendarDTOEdit> {

      return this.http.post<IEmployeeCalendarDTOEdit>(`${this.apiUrl}EmployeeCalendar/Edit`, record, { headers: this.getAuthHeaders()});
    }
  }


