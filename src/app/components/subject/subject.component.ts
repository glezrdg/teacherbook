import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/student';
import { CalificationService } from 'src/app/services/calification.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  inputSearch = '';
  id: number;

  constructor(
    private _studentService: StudentService,
    private _calificationService: CalificationService,
    private aRoute: ActivatedRoute
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.obtainStudentByCourse();
  }

  obtainStudentByCourse() {
    this._studentService.getStudentByCourse(this.id).subscribe((data) => {
      this.students = data;
      this.students.forEach((student) => {
        this.obtainCalification();
      });
    });
  }

  obtainCalification() {
    this._calificationService
      .getCalificationById('Matematicas', 1)
      .subscribe((data) => {
        console.log(data[0]);
      });
  }

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
}
