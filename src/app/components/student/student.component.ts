import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { GradeService } from 'src/app/services/grade.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  id: number;
  constructor(
    private _studentService: StudentService,
    private _gradeService: GradeService,
    private aRoute: ActivatedRoute
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    console.log(this.id);
  }
  courseId: number = 0;
  students: Student[] = [];

  ngOnInit(): void {
    this.obtainStudentByCourse();
  }

  obtainStudents() {
    this._studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  obtainOneStudent(id: number) {
    this._studentService.getOneStudent(id).subscribe((data) => {});
  }
  obtainStudentByCourse() {
    this._studentService.getStudentByCourse(this.id).subscribe((data) => {
      this.students = data;
      console.log(this.students);
    });
  }

  obtainGrade() {
    this._gradeService.getGrades().subscribe((data) => {
      console.log('obtained');
    });
  }

  removeGrade(id: number) {
    this._gradeService.deleteGrade(id).subscribe((data) => {
      this.obtainGrade();
    });
  }
}
