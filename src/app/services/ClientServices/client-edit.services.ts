import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IClientDTOEdit } from '../../interfaces/Client/ClientUpdate';

@Injectable({
  providedIn: 'root'
})
export class ClientEditService {

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
  updateClientData(record: any): Observable<IClientDTOEdit> {

      return this.http.post<IClientDTOEdit>(`${this.apiUrl}Client/Edit`, record, { headers: this.getAuthHeaders()});
    }
  }


