import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ILookupGetByTagNameClientTypeResponse } from '../../interfaces/Lookup Master/Lookup-GetByTagName-ClientType';

@Injectable({
  providedIn: 'root'
})
export class LookupGetByTagNameClientTypeService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  lookupClientTypeDataGet = (): Observable<ILookupGetByTagNameClientTypeResponse> => {
      return this.http.get<ILookupGetByTagNameClientTypeResponse>(`${this.apiUrl}Lookup/LookupGetByTagName/ClientType`);

  }
}
