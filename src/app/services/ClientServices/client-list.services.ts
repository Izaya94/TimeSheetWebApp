import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IClientDTOResponse } from '../../interfaces/Client/ClientList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientListService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClientCalendarList = (): Observable<IClientDTOResponse> => {
      return this.http.get<IClientDTOResponse>(`${this.apiUrl}Client/List`, {headers: this.getAuthHeaders()});

  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Or wherever you store your token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
