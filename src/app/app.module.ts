//angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// modules
import { SharedModule } from './shared/shared.module';

//components
import { AppComponent } from './app.component';
import { GradeComponent } from './components/grade/grade.component';
import { StudentComponent } from './components/student/student.component';
import { ClockComponent } from './components/clock/clock.component';
import { ListComponent } from './components/list/list.component';
import { SubjectComponent } from './components/subject/subject.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    GradeComponent,
    StudentComponent,
    ClockComponent,
    ListComponent,
    SubjectComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
