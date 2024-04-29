import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IRole } from '../interfaces/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getroles = () : Observable<IRole[]> =>
    this.http.get<IRole[]>(`${this.apiUrl}Account/rolelist`)
}


