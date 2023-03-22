import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  selectedSubject = '';
  anotherSubject = '';
  @Input() subject: string = '';
  @Output() updatedSubject = new EventEmitter<string>();
  id: number;

  constructor(private aRoute: ActivatedRoute, private router: Router) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
    this.anotherSubject = this.aRoute.snapshot.paramMap.get('subject')!;
  }

  changeValue(value: string, subject: string) {
    this.updatedSubject.emit(value);
    this.router.navigate([`grade/${this.id}/${subject}`])
  }

  ngOnInit() {
    this.selectedSubject = this.subject;
  }
}
