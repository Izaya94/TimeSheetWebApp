import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IEmployeeDTOResponse } from '../../interfaces/Employee/EmployeeList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployeeCalendarList = (): Observable<IEmployeeDTOResponse> => {
      return this.http.get<IEmployeeDTOResponse>(`${this.apiUrl}Employee/List`, {headers: this.getAuthHeaders()});

  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
