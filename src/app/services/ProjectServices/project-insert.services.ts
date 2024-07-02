import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IProjectDTOAdd } from '../../interfaces/Project/ProjectInsert';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectInsertService {

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
  
  insertProjectData(record: any): Observable<IProjectDTOAdd> {
    console.log(record);
      return this.http.post<IProjectDTOAdd>(`${this.apiUrl}Project/Add`, record, { headers: this.getAuthHeaders()});
    }

  }

