import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private myAppUrl: string = enviroment.endpoint;
  private myApiUrl: string = 'api/List/';

  constructor(private http: HttpClient) {}

  createList(list: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, list);
  }

  getListByDate(id: number, subject: string, date: string): Observable<any> {
    return this.http.get(
      `${this.myAppUrl}${this.myApiUrl}Course/${id}/${subject}/${date}`
    );
  }
}
