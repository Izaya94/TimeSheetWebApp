import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ILookupGetByTagNameWorkTypeResponse } from '../../interfaces/Lookup Master/Lookup-GetByTagName-WorkType';

@Injectable({
  providedIn: 'root'
})
export class LookupGetByTagNameWorkTypeService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  lookupWorkTypeDataGet = (): Observable<ILookupGetByTagNameWorkTypeResponse> => {
      return this.http.get<ILookupGetByTagNameWorkTypeResponse>(`${this.apiUrl}Lookup/LookupGetByTagName/WorkType`);

  }
}
