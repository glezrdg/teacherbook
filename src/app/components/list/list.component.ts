import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  subject: string = 'Lengua Española';
  students: any[] = [];
  id: number;

  constructor(
    private _studentService: StudentService,

    private aRoute: ActivatedRoute
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

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

  updateSubject(e: string) {
    this.subject = e;
    this.obtainStudentByCourse();
  }
}
