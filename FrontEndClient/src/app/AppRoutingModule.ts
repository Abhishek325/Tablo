import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ConfigureComponent } from './main/configure/configure.component';
import { ListComponent } from './main/list/list.component';
import { AddComponent } from './main/configure/add/add.component';
import { EditComponent } from './main/configure/edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/configure',
    pathMatch: 'full'
  },
  {
    path: 'configure',
    children: [
      {
        path: '',
        component: ConfigureComponent,
      },
      {
        path: 'add',
        component: AddComponent
      },
      {
        path: ':id',
        component: EditComponent
      }
    ]
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
