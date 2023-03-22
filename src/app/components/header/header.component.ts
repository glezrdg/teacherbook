import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  studentText: any;
  selectedSubject = '';
  anotherSubject = '';
  id: number;
  @Input() subject: string = '';
  @Output() updatedSubject = new EventEmitter<string>();
  // @Output() studentTextOutput = new EventEmitter<any>();

  constructor(private aRoute: ActivatedRoute, private router: Router) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    this.anotherSubject = this.aRoute.snapshot.paramMap.get('subject')!;
  }

  changeValue(value: string, subject: string) {
    this.updatedSubject.emit(value);
    this.router.navigate([`grade/${this.id}/${subject}`]);
  }
  // sendStudentText() {
  //   this.studentTextOutput.emit(this.studentText);
  // }

  ngOnInit() {
    this.selectedSubject = this.subject;
  }
}
