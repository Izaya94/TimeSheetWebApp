import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { IEmployeeDTOAdd } from '../../interfaces/Employee/EmployeeInsert';

@Injectable({
  providedIn: 'root'
})
export class EmployeeInsertService {


  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  insertEmployeeData(record: any): Observable<IEmployeeDTOAdd> {
    return this.http.post<IEmployeeDTOAdd>(`${this.apiUrl}Employee/add`, record)
  }
}
