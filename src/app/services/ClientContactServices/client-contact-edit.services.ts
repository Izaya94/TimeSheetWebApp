import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IClientContactDTOEdit } from '../../interfaces/ClientContact/ClientContactUpdate';

@Injectable({
  providedIn: 'root'
})
export class ClientContactEditService {

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
  updateClientContactData(record: any): Observable<IClientContactDTOEdit> {

      return this.http.post<IClientContactDTOEdit>(`${this.apiUrl}ClientContact/Edit`, record, { headers: this.getAuthHeaders()});
    }
  }


