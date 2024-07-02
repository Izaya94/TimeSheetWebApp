import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IClientContactDTOAdd } from '../../interfaces/ClientContact/ClientContactInsert';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientContactInsertService {

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
  
  insertClientContactData(record: any): Observable<IClientContactDTOAdd> {
    console.log(record);
      return this.http.post<IClientContactDTOAdd>(`${this.apiUrl}ClientContact/Add`, record, { headers: this.getAuthHeaders()});
    }

  }

