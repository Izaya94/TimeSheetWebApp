import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IProjectDTOEdit } from '../../interfaces/Project/ProjectUpdate';

@Injectable({
  providedIn: 'root'
})
export class ProjectEditService {

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
  updateProjectData(record: any): Observable<IProjectDTOEdit> {

      return this.http.post<IProjectDTOEdit>(`${this.apiUrl}Project/Edit`, record, { headers: this.getAuthHeaders()});
    }
  }


