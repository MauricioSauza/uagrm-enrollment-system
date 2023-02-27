import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionComponent } from './components/adicion/adicion.component';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:'inscripcion',
        component: EnrollmentsComponent
      },
      {
        path:'adicion',
        component: AdicionComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
