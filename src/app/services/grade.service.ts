import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Grade } from '../interfaces/grade';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private myAppUrl: string = enviroment.endpoint;
  private myApiUrl: string = 'api/Grade/';

  constructor(private http: HttpClient) {}
  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getOneGrade(id: Number): Observable<Grade> {
    return this.http.get<Grade>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  createGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(`${this.myAppUrl}${this.myApiUrl}`, grade);
  }
  deleteGrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
