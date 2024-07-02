import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IClientContactDTODelete } from '../../interfaces/ClientContact/ClientContactDelete';

@Injectable({
  providedIn: 'root'
})
export class ClientContactDeleteService {

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
  
  deleteClientContactData(record: any): Observable<IClientContactDTODelete> {
      console.log(record);
      const ClientContactId = record.ClientContactId;
      console.log(ClientContactId);
      return this.http.post<IClientContactDTODelete>(`${this.apiUrl}ClientContact/Delete/${ClientContactId}`, record, { headers: this.getAuthHeaders()});
    }

}
