import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class CalificationService {
  private myAppUrl: string = enviroment.endpoint;
  private myApiUrl: string = 'api/Calification/Course/';

  constructor(private http: HttpClient) {}

  getCalificationById(subject: string, id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${subject}/${id}`);
  }
}
