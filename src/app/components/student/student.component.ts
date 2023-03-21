import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from 'src/app/interfaces/grade';
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
  courseId: number = 0;
  students: Student[] = [];
  filteredStudents: Student[] = [];
  form: FormGroup;
  operation = 'Add';
  studentId!: number;
  grade: Grade = { gradeId: 0, name: '', students: [] };
  inputSearch = '';
  subject: string = ''

  constructor(
    private _studentService: StudentService,
    private _gradeService: GradeService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    console.log(this.id);

    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  @ViewChild('modal') modal!: ElementRef;

  searchValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputSearch = value;
    console.log(this.inputSearch);
    this.filteredStudents = this.students.filter((p) =>
      p.name.toLowerCase().includes(this.inputSearch.toLocaleLowerCase())
    );
  }

  choosedStudents() {
    if (this.filteredStudents.length > 0) {
      return this.filteredStudents;
    } else return this.students;
  }

  ngOnInit(): void {
    this.obtainStudentByCourse();
    this.obtainOneGrade(this.id);
  }
  ngOnChanges() { }

  openModal() {
    this.modal.nativeElement.showModal();
    console.log(this.modal);
  }
  closeModal() {
    this.modal.nativeElement.close();
    console.log(this.modal);
  }

  obtainStudents() {
    this._studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  obtainOneStudent(id: number) {
    this._studentService.getOneStudent(id).subscribe((data) => {
      this.operation = 'Edit';
      this.studentId = data.id!;
      this.openModal();
      this.form.setValue({
        name: data.name,
      });
    });
  }
  log() {
    console.log(this.id);
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
  obtainOneGrade(id: number) {
    this._gradeService.getOneGrade(id).subscribe((data) => {
      this.grade = data;
      this.subject = this.grade.name
    });
  }
  addStudent(student: Student) {
    this._studentService.createStudent(student).subscribe((data) => {
      console.log(data);
      this.obtainStudentByCourse();
      this.closeModal();
    });
  }

  addOrEditStudent() {
    const student: Student = {
      name: this.form.value.name,
      gradeId: this.id,
    };
    if (this.operation == 'Edit') {
      this._studentService
        .updateStudent(this.studentId, student)
        .subscribe((data) => {
          console.log(data);
          this.obtainStudentByCourse();
          this.closeModal();
        });
    } else {
      this.addStudent(student);
    }
  }

  removeGrade(id: number) {
    this._gradeService.deleteGrade(id).subscribe((data) => {
      this.obtainGrade();
      this.router.navigate(['/']);
    });
  }
  removeStudent(id: number) {
    this._studentService.deleteStudent(id).subscribe((data) => {
      this.obtainStudentByCourse();
    });
  }
  // updateOneStudent() {
  //   this._studentService.updateStudent().subscribe((data) => {

  //   })
  // }
}
