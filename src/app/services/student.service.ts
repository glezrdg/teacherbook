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
  private myApiUrl: string = 'api/Student/';

  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http.get<Student[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  getOneStudent(id: Number): Observable<Student> {
    return this.http.get<Student>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  getStudentByCourse(id: number) {
    return this.http.get<Student[]>(
      `${this.myAppUrl}${this.myApiUrl}Course/${id}`
    );
  }
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.myAppUrl}${this.myApiUrl}`, student);
  }
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }
  updateStudent(id: number, student: Student): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      student
    );
  }
}
