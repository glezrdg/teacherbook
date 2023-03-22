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

  // ngOnChanges() {
  //   this.obtainCalification();
  // }

  obtainStudentByCourse() {
    this._studentService.getStudentByCourse(this.id).subscribe((data) => {
      this.students = data.map((student) => ({
        ...student,
        calification: student.califications?.find(
          (c) => c.subject == this.subject
        ),
      }));

      // this.listStudents = data.map(s => ({
      //   name: s.name,
      //   present: null
      // }))
    });
  }

  // changeListStudent(student: string, present: boolean) {
  //   let index = this.listStudent.findIndex(s => s._id === student)
  //   this.listStudent[index].present = present
  // }

  // obtainCalification() {
  //   if (this.subject) {
  //     this._calificationService
  //       .getCalificationById(this.subject, 1)
  //       .subscribe((data) => {
  //         console.log(data[0], 'no bulto');
  //       });
  //   } else {
  //     return
  //   }
  // }

  searchValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputSearch = value;
    this.filteredStudents = this.students.filter((p) =>
      p.name.toLowerCase().includes(this.inputSearch.toLocaleLowerCase())
    );
  }

  // choosedStudents() {
  //   if (this.filteredStudents.length > 0) {
  //     return this.filteredStudents.map(student => ({
  //       ...student,
  //       calification: student.califications?.find(cal => cal.subject === this.subject)
  //     }));
  //   }
  // }

  filterCalification(student: Student): string {
    console.log(
      String(
        student.califications?.find(
          (c: Calification) => c.subject == this.subject
        )?.value
      )
    );
    return String(50);
  }

  updateCalification(): void {
    console.log(this.selectedStudent);
    if (!this.selectedStudent) return;
    try {
      this._calificationService
        .updateCalification(this.selectedStudent.id, this.selectedStudent.value)
        .subscribe((data) => {
          this.obtainStudentByCourse();
          console.log(data, 'brr');
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

  updateSubject(e: string) {
    this.subject = e;
    this.obtainStudentByCourse();
  }
}
