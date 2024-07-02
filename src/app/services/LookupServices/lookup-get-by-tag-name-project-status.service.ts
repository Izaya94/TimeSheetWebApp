import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ILookupGetByTagNameProjectStatusResponse } from '../../interfaces/Lookup Master/Lookup-GetByTagName-ProjectStatus';

@Injectable({
  providedIn: 'root'
})
export class LookupGetByTagNameProjectStatusService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  lookupProjectStatusDataGet = (): Observable<ILookupGetByTagNameProjectStatusResponse> => {
      return this.http.get<ILookupGetByTagNameProjectStatusResponse>(`${this.apiUrl}Lookup/LookupGetByTagName/ProjectStatus`);

  }
}
