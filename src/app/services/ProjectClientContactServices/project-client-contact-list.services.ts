import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProjectClientContactDTOResponse } from '../../interfaces/ProjectClientContact/ProjectClientContactList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectClientContactListService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjectClientContactCalendarList = (): Observable<IProjectClientContactDTOResponse> => {
      return this.http.get<IProjectClientContactDTOResponse>(`${this.apiUrl}ProjectClientContact/List`, {headers: this.getAuthHeaders()});

  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
