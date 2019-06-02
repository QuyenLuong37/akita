import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo/component/todo-list/todo-list.component';
import { TodoDetailComponent } from './todo/component/todo-detail/todo-detail.component';
import { AddTodoComponent } from './todo/component/add-todo/add-todo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo-list',
    pathMatch: 'full'
  },
  {
    path: 'todo-list',
    component: TodoListComponent
  },
  {
    path: 'todo-list/:id',
    component: TodoDetailComponent
  },
  {
    path: 'add-todo',
    component: AddTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
