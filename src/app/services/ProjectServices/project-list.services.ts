import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProjectDTOResponse } from '../../interfaces/Project/ProjectList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjectList = (): Observable<IProjectDTOResponse> => {
      return this.http.get<IProjectDTOResponse>(`${this.apiUrl}Project/List`, {headers: this.getAuthHeaders()});

  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
