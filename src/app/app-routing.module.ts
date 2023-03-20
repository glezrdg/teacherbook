import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeComponent } from './components/grade/grade.component';
import { StudentComponent } from './components/student/student.component';
import { SubjectComponent } from './components/subject/subject.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: GradeComponent },
      { path: 'grade/:id', component: StudentComponent },
      { path: 'grade/:id/subject', component: SubjectComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
