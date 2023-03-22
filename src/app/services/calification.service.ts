import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Calification } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CalificationService {
  private myAppUrl: string = enviroment.endpoint;
  private myApiUrl: string = 'api/Calification/';

  constructor(private http: HttpClient) { }

  getCalificationById(subject: string, id: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${subject}`);
  }

  updateCalification(id: number, value: number): Observable<any> {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}${id}`, { value });
  }
  
}
