import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ILookupGetByTagNameCityResponse } from '../../interfaces/Lookup Master/Lookup-GetByTagName-City';

@Injectable({
  providedIn: 'root'
})
export class LookupGetByTagNameCityService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  lookupWorkTypeDataGet = (): Observable<ILookupGetByTagNameCityResponse> => {
      return this.http.get<ILookupGetByTagNameCityResponse>(`${this.apiUrl}Lookup/LookupGetByTagName/City`);

  }
}
