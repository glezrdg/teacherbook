import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GradeService } from '../../services/grade.service';
import { Grade } from '../../interfaces/grade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css'],
})
export class GradeComponent implements OnInit {
  grades: Grade[] = [];
  grade: Grade = { gradeId: 0, name: '', students: [] };
  gradeId: number = 0;

  form: FormGroup;

  constructor(private _gradeService: GradeService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  ngOnInit() {
    this.obtainGrade();
  }

  openModal() {
    this.modal.nativeElement.showModal();
    console.log(this.modal);
  }
  closeModal() {
    this.modal.nativeElement.close();
    console.log(this.modal);
  }

  obtainGrade() {
    this._gradeService.getGrades().subscribe((data) => {
      this.grades = data;
    });
  }

  obtainOneGrade(id: number) {
    this._gradeService.getOneGrade(id).subscribe((data) => {
      this.grade = data;
      this.gradeId = this.grade.gradeId!;
      console.log(this.grade);
    });
  }

  addGrade() {
    const grade: Grade = {
      name: this.form.value.name,
    };
    this._gradeService.createGrade(grade).subscribe((data) => {
      console.log(grade);
      this.obtainGrade();
    });
    this.closeModal();
  }
}
