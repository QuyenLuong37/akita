import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from './share/share.module';
import { TodoListComponent } from './todo/component/todo-list/todo-list.component';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TodoDetailComponent } from './todo/component/todo-detail/todo-detail.component';
import { TodoDialogComponent } from './todo/component/todo-dialog/todo-dialog.component';
import { AddTodoComponent } from './todo/component/add-todo/add-todo.component';
import { LoginComponent } from './login/login.component';
// firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailComponent,
    TodoDialogComponent,
    AddTodoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ShareModule,
    HttpClientModule
  ],
  entryComponents: [TodoDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
