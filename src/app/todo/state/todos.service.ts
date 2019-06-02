import { Injectable } from "@angular/core";
import { Todo } from "./todos.model";
import { Observable, of } from "rxjs";
import { TodoQuery } from "./todos.query";
import { ToDoStore } from "./todos.store";
import { HttpClient } from "@angular/common/http";
import { tap, catchError, distinctUntilChanged } from "rxjs/operators";
import { ID } from "@datorama/akita";

@Injectable({
  providedIn: "root"
})
export class TodosService {
  constructor(
    public store: ToDoStore,
    private query: TodoQuery,
    private http: HttpClient
  ) {}

  getAllData(): Observable<Todo[]> {
    return this.http.get<Todo[]>("/api/data").pipe(
      tap(v => console.log(v)),
      catchError(err => of(err))
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>("/api/data", todo).pipe(
      tap(mes => console.log(mes)),
      catchError(err => of(err))
    );
  }

  putTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`/api/data/${todo.id}`, todo).pipe(
      tap(notification => {
        this.store.updateSnackBarMessage(notification["message"]);
      }),
      catchError(err => of(err))
    );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`/api/data/${todo.id}`).pipe(
      tap(notification => {
        this.store.updateSnackBarMessage(notification["message"]);
      }),
      catchError(err => of(err))
    );
  }

  setActive(id: ID) {
    this.store.setActive(id);
  }
}
