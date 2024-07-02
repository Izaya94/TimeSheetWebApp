import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IClientDTOAdd } from '../../interfaces/Client/ClientInsert';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientInsertService {

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
  
  insertClientData(record: any): Observable<IClientDTOAdd> {
    console.log(record);
      return this.http.post<IClientDTOAdd>(`${this.apiUrl}Client/Add`, record, { headers: this.getAuthHeaders()});
    }

  }

