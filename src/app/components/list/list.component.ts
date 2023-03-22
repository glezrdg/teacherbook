import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/interfaces/list';
import { ListService } from 'src/app/services/list.service';
import { StudentService } from 'src/app/services/student.service';
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  subject: string = '';
  students: any[] = [];
  id: number;
  listStudents: any;
  form: FormGroup;
  date1: Date = new Date();

  constructor(
    private _studentService: StudentService,
    private _listService: ListService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    this.subject = this.aRoute.snapshot.paramMap.get('subject')!;
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }
  @ViewChild('didCome') didCome!: ElementRef;

  ngOnInit() {
    this.obtainStudentByCourse();
  }

  obtainStudentByCourse() {
    this._studentService.getStudentByCourse(this.id).subscribe((data) => {
      this.listStudents = data.map((student) => ({
        ...student,
        name: student.name,
        present: null,
      }));
      console.log(this.listStudents);
    });
  }
  didStudentCome(did: boolean) {
    if (did === true) {
      this.didCome.nativeElement.classList.add('green-light');
      console.log(did);
    }
  }

  updateSubject(e: string) {
    this.subject = e;
    this.obtainStudentByCourse();
  }

  changeListStudent(student: string, present: boolean) {
    let index = this.listStudents.findIndex(
      (s: { name: string }) => s.name === student
    );
    this.listStudents[index].present = present;
    console.log(index.name, index.present);
  }

  addList() {
    const list: List = {
      subject: this.subject,
      gradeId: this.id,
      listStudents: this.listStudents,
    };
    this._listService.createList(list).subscribe((data) => {
      console.log(data);
      this._snackBar.open('List Created ', ' ', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
      });
    });
  }

  convertirFecha(date: string) {
    const fechaObjeto = new Date(date);
    const mes = fechaObjeto.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que debes sumar 1
    const dia = fechaObjeto.getDate() + 1;
    const anio = fechaObjeto.getFullYear();

    return `${mes.toString()}/${dia.toString().padStart(2, '0')}/${anio}`;
  }

  searchList() {
    const date2 = this.convertirFecha(this.form.value.name);
    console.log(date2);
    var fechacodificada = encodeURIComponent(date2);

    this._listService
      .getListByDate(this.id, this.subject, fechacodificada)
      .subscribe((data) => {
        this.listStudents = data.listStudents.map((student: any) => ({
          ...student,
          name: student.name,
          present: student.present,
        }));
        console.log(this.listStudents);
      });
  }
}
