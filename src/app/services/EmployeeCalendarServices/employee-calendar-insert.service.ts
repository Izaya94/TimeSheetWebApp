import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IEmployeeCalendarDTOAdd } from '../../interfaces/EmployeeCalendar/EmployeeCalendarInsert';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarInsertService {

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
  
  insertEmployeeCalendarData(record: any): Observable<IEmployeeCalendarDTOAdd> {
    console.log(record);
      return this.http.post<IEmployeeCalendarDTOAdd>(`${this.apiUrl}EmployeeCalendar/Add`, record, { headers: this.getAuthHeaders()});
    }

  }

