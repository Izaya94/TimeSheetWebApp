import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IProjectDTODelete } from '../../interfaces/Project/ProjectDelete';

@Injectable({
  providedIn: 'root'
})
export class ProjectDeleteService {

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
  
  deleteProjectData(record: any): Observable<IProjectDTODelete> {
      console.log(record);
      const ProjectId = record.ProjectId;
      console.log(ProjectId);
      return this.http.post<IProjectDTODelete>(`${this.apiUrl}Project/Delete/${ProjectId}`, record, { headers: this.getAuthHeaders()});
    }

}
