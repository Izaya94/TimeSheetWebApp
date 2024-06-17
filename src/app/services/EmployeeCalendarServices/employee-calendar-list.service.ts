import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeCalendarDTOResponse } from '../../interfaces/EmployeeCalendar/EmployeeCalendarList';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarListService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployeeCalendarList = (): Observable<IEmployeeCalendarDTOResponse> => {
      return this.http.get<IEmployeeCalendarDTOResponse>(`${this.apiUrl}EmployeeCalendar/List`, {headers: this.getAuthHeaders()});

  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // getData() {
  //   return this.http.get(`${this.apiUrl}/your-endpoint`, { headers: this.getAuthHeaders() });
  // }

  // postData(data: any) {
  //   return this.http.post(`${this.apiUrl}/your-endpoint`, data, { headers: this.getAuthHeaders() });
  // }
}
