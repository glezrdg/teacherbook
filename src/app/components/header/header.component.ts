import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  selectedSubject = '';
  @Input() subject: string = '';
  @Output() updatedSubject = new EventEmitter<string>();

  changeValue(value: string) {
    this.updatedSubject.emit(value);
  }

  ngOnInit() {
    this.selectedSubject = this.subject;
  }
}
