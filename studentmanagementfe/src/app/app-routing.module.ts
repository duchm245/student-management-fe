import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {LookupFeeComponent} from "./pages/lookup-fee/lookup-fee.component";
import {AddStudentComponent} from "./pages/students-page/student-add/add-student.component";
import {EditStudentComponent} from "./pages/students-page/student-edit/edit-student.component";
import {AuthGuard} from "./security/guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        m => m.LoginPageModule,
      ),
  },
  {
    path: 'getStudent',
    loadChildren: () =>
      import('./pages/students-page/./student.module').then(
        m => m.StudentModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(
        m => m.HomeModule,
      ),
  },
  {
    path: 'clazz',
    loadChildren: () =>
      import('./pages/clazz-page/clazz-page.module').then(
        m => m.ClazzGetModule,
      ),
  },
  {
    path: 'timeLine',
    loadChildren: () =>
      import('./pages/time-line-page/time-line-page.module').then(
        m => m.TimeLinePageModule,
      ),
  },
  {
    path: 'scheduleExam',
    loadChildren: () =>
      import('./pages/schedule-exam/schedule-exam.module').then(
        m => m.ScheduleExamModule,
      ),
  },

  {
    path: 'mark',
    loadChildren: () =>
      import('./pages/mark-page/mark-page.module').then(
        m => m.MarkPageModule,
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then(
        m => m.HomeModule,
      ),
  },
  // {
  //   path: '',
  //   component: NavComponent,
  //   children: navRoutes,
  //   canActivate: [AuthGuard],
  //   // canActivateChild: [NavGuard],
  // },

  {path: 'editStudent/:id', component: EditStudentComponent, canActivate: [AuthGuard]},
  {path: 'addStudent', component: AddStudentComponent, canActivate: [AuthGuard]},

  {path: 'fee', component: LookupFeeComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
