import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILookupListResponse } from '../interfaces/lookup';

@Injectable({
    providedIn: 'root'
})
export class LookupService {

    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getlookup = (): Observable<ILookupListResponse> => {
        return this.http.get<ILookupListResponse>(`${this.apiUrl}Lookup/LookupGetByTagName/Designation`);

    }
}
