import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IClientContactDTOResponse } from '../../interfaces/ClientContact/ClientContactList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientContactListService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClientContactCalendarList = (): Observable<IClientContactDTOResponse> => {
      return this.http.get<IClientContactDTOResponse>(`${this.apiUrl}ClientContact/List`, {headers: this.getAuthHeaders()});

  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
