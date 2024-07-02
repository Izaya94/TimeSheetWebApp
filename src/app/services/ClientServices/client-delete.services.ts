import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IClientDTODelete } from '../../interfaces/Client/ClientDelete';

@Injectable({
  providedIn: 'root'
})
export class ClientDeleteService {

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
  
  deleteClientData(record: any): Observable<IClientDTODelete> {
      console.log(record);
      const ClientId = record.ClientId;
      console.log(ClientId);
      return this.http.post<IClientDTODelete>(`${this.apiUrl}Client/Delete/${ClientId}`, record, { headers: this.getAuthHeaders()});
    }

}
