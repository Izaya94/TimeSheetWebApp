import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IProjectClientContactDTODelete } from '../../interfaces/ProjectClientContact/ProjectClientContactDelete';

@Injectable({
  providedIn: 'root'
})
export class ProjectClientContactDeleteService {

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
  
  deleteProjectClientContactData(record: any): Observable<IProjectClientContactDTODelete> {
      console.log(record);
      const ProjectClientContactId = record.ProjectClientContactId;
      console.log(ProjectClientContactId);
      return this.http.post<IProjectClientContactDTODelete>(`${this.apiUrl}ProjectClientContact/Delete/${ProjectClientContactId}`, record, { headers: this.getAuthHeaders()});
    }

}
