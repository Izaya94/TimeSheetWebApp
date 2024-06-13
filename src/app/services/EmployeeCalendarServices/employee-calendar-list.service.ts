import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployeeCalendarDTOResponse } from '../../interfaces/EmployeeCalendar/EmployeeCalendarList';

@Injectable({
  providedIn: 'root'
})
export class EmployeeCalendarListService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployeeCalendarList = (): Observable<IEmployeeCalendarDTOResponse> => {
      return this.http.get<IEmployeeCalendarDTOResponse>(`${this.apiUrl}EmployeeCalendar/List`);

  }
}
