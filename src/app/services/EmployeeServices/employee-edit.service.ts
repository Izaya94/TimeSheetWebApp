import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeDTOEdit } from '../../interfaces/Employee/EmployeeUpdate';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEditService {

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
  updateEmployeeCalendarData(record: any): Observable<IEmployeeDTOEdit> {

      return this.http.post<IEmployeeDTOEdit>(`${this.apiUrl}Employee/Edit`, record, { headers: this.getAuthHeaders()});
    }
}
