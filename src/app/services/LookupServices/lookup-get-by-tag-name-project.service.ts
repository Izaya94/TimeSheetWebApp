import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ILookupGetByTagNameProjectResponse } from '../../interfaces/Lookup Master/Lookup-GetByTagName-Project';

@Injectable({
  providedIn: 'root'
})
export class LookupGetByTagNameProjectService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  lookupProjectDataGet = (): Observable<ILookupGetByTagNameProjectResponse> => {
      return this.http.get<ILookupGetByTagNameProjectResponse>(`${this.apiUrl}Lookup/LookupGetByTagName/Project`);

  }
}
