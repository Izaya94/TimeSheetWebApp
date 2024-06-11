import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IEmployeeCalendarAdd } from '../../interfaces/EmployeeCalendar/EmployeeCalendarInsert';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarInsertService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ){}

  insertEmployeeCalendarData(record: any): Observable<IEmployeeCalendarAdd> {
    console.log(record);
    return this.http.post<IEmployeeCalendarAdd>(`${this.apiUrl}EmployeeCalendar/Add`, record)
  }
  

}
