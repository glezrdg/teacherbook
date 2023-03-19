import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private myAppUrl: string = enviroment.endpoint;
  private myApiUrl: string = 'api/Student/Course/';

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<Student[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  getOneStudent(id: Number) {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  getStudentByCourse(id: number) {
    return this.http.get<Student[]>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
}
