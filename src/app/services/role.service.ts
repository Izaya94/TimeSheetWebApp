import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { IRole, IRoleResponse } from '../interfaces/role';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiUrl = environment.apiUrl;

  constructor(private http:HttpClient) { }

  // getroles = () : Observable<IRole[]> =>
  //   this.http.get<IRole[]>(`${this.apiUrl}Account/rolelist`)


getroles = () :Observable<IRoleResponse> => {
   return this.http.get<IRoleResponse>(`${this.apiUrl}Account/rolelist`);
   
}
}


// list(): Observable<IExamDTOResponse> {
//   const url = this._dataConstantsService.BASE_API_URL + "Exam/List";
//   return this._http.get<IExamDTOResponse>(url);
// }

// login(data: LoginRequest): Observable<AuthResponse> {
//   return this.http
//     .post<AuthResponse>(`${this.apiUrl}Account/login`, data)
//     .pipe(
//       map((response) => {
//         if (response.flag == true) {
//           localStorage.setItem(this.tokenKey, response.token);
//         }
//         return response;
//       })
//     );
// }


