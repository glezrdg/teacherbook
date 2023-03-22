import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student, Calification } from 'src/app/interfaces';
import { CalificationService } from 'src/app/services/calification.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  students: any[] = [];
  filteredStudents: Student[] = [];
  selectedStudent: any = {};
  inputSearch = '';
  subject: string = '';
  id: number;
  calificationLiteral = '';
  studentTextR: any = 'mmg';

  constructor(
    private _studentService: StudentService,
    private _calificationService: CalificationService,
    private aRoute: ActivatedRoute
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    this.subject = this.aRoute.snapshot.paramMap.get('subject')!;
  }

  ngOnInit(): void {
    this.obtainStudentByCourse();
  }

  getStudentText(studentTextR: string) {
    this.studentTextR = studentTextR;
    console.log(this.studentTextR);
  }
  deunave() {
    console.log(this.studentTextR);
  }

  obtainStudentByCourse() {
    
    this._studentService.getStudentByCourse(this.id).subscribe((data) => {
      this.students = data.map((student) => ({
        ...student,
        calification: student.califications?.find(
          (c) => c.subject == this.subject
        ),
      }));
      console.log(this.students);
    });
  }

  searchValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputSearch = value;
    this.filteredStudents = this.students.filter((p) =>
      p.name.toLowerCase().includes(this.inputSearch.toLocaleLowerCase())
    );
  }

  updateCalification(): void {
    if (!this.selectedStudent) return;
    try {
      this._calificationService
        .updateCalification(this.selectedStudent.id, this.selectedStudent.value)
        .subscribe((data) => {
          this.obtainStudentByCourse();
        });
    } catch (error) {
      console.log(error);
    }
  }

  changeCalification(e: Event, calification: any) {
    e.preventDefault();

    this.selectedStudent = calification;
    console.log(this.selectedStudent);

    this.selectedStudent.value = (e.target as HTMLInputElement).value;
    (e.target as HTMLInputElement).focus;
  }

  updateSubject(title: string) {
    this.subject = title;
    this.obtainStudentByCourse();
  }

  calcularLiteral(calificacion: number): string {
    if (calificacion >= 90 && calificacion <= 100) {
      return (this.calificationLiteral = 'A');
    } else if (calificacion >= 80 && calificacion <= 89) {
      return (this.calificationLiteral = 'B');
    } else if (calificacion >= 70 && calificacion <= 79) {
      return (this.calificationLiteral = 'C');
    } else {
      return (this.calificationLiteral = 'F');
    }
  }
}
