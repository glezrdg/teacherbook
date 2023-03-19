import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeComponent } from './components/grade/grade.component';
import { StudentComponent } from './components/student/student.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: GradeComponent },
      { path: 'grade/:id', component: StudentComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
