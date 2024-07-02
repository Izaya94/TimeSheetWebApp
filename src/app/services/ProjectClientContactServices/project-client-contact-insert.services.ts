import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IProjectClientContactDTOAdd } from '../../interfaces/ProjectClientContact/ProjectClientContactInsert';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectClientContactInsertService {

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
  
  insertProjectClientContactData(record: any): Observable<IProjectClientContactDTOAdd> {
    console.log(record);
      return this.http.post<IProjectClientContactDTOAdd>(`${this.apiUrl}ProjectClientContact/Add`, record, { headers: this.getAuthHeaders()});
    }

  }

