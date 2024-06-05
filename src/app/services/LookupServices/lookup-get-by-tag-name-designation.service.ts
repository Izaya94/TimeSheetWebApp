import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ILookupGetByTagNameDesignationResponse } from '../../interfaces/Lookup Master/Lookup-GetByTagName-Designation';

@Injectable({
  providedIn: 'root'
})
export class LookupGetByTagNameDesignationService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  lookupDesignationDataGet = (): Observable<ILookupGetByTagNameDesignationResponse> => {
      return this.http.get<ILookupGetByTagNameDesignationResponse>(`${this.apiUrl}Lookup/LookupGetByTagName/Designation`);

  }
}
