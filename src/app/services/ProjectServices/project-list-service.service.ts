import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectListServiceService {

  constructor() { }

  getProjects(): Observable<any[]> {
    const dummyProjects = [
      { id: 1, name: 'Project 1', description: 'Description for Project 1' },
      { id: 2, name: 'Project 2', description: 'Description for Project 2' },
      { id: 3, name: 'Project 3', description: 'Description for Project 3' },
      { id: 4, name: 'Project 4', description: 'Description for Project 4' },
    ];
    return of(dummyProjects);
  }
}
