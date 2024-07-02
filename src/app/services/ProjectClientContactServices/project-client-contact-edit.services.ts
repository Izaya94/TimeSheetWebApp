import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IProjectClientContactDTOEdit } from '../../interfaces/ProjectClientContact/ProjectClientContactUpdate';

@Injectable({
  providedIn: 'root'
})
export class ProjectClientContactEditService {

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
  updateProjectClientContactData(record: any): Observable<IProjectClientContactDTOEdit> {

      return this.http.post<IProjectClientContactDTOEdit>(`${this.apiUrl}ProjectClientContact/Edit`, record, { headers: this.getAuthHeaders()});
    }
  }


