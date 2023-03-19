import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent {
  private daysArray = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thurday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  private date = new Date();
  public hour: any;
  public minute = '';
  public second = '';
  public ampm = '';
  public day = '';

  ngOnInit() {
    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);

    this.day = this.daysArray[this.date.getDay()];
  }
  updateDate(date: Date) {
    const hours = date.getHours();
    this.ampm = hours >= 12 ? 'PM' : 'AM';
    this.hour = hours % 12;
    this.hour = this.hour ? this.hour : 12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = date.getMinutes();
    this.minute = minutes < 10 ? '0' + minutes : minutes.toString();

    const seconds = date.getSeconds();
    this.second = seconds < 10 ? '0' + seconds : seconds.toString();
  }
}
