import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeDTODelete } from '../../interfaces/Employee/EmployeeDelete';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDeleteService {

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
  
  deleteEmployeeCalendarData(record: any): Observable<IEmployeeDTODelete> {
      console.log(record);
      const employeeId = record.employeeId;
      console.log(employeeId);
      return this.http.post<IEmployeeDTODelete>(`${this.apiUrl}Employee/Delete/${employeeId}`, record, { headers: this.getAuthHeaders()});
    }
}
