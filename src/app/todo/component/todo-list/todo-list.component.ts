import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import * as firebase from "firebase/app";
import "firebase/database";
import { ToDoStore } from "../../state/todos.store";
import { TodoQuery } from "../../state/todos.query";
import {
  switchMap,
  concat,
  debounceTime,
  filter,
  startWith
} from "rxjs/operators";
import { forkJoin, Observable } from "rxjs";
import { TodosService } from "../../state/todos.service";
import { Todo } from "../../state/todos.model";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog, MatSnackBar } from "@angular/material";
import { TodoDialogComponent } from "../todo-dialog/todo-dialog.component";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  todoList: Todo[];
  listSearchTodos: Todo[];
  filterListTodos: Todo[];
  searchTerm = new FormControl();
  filterTodos = new FormControl("all");
  loaded$: Observable<boolean>;
  constructor(
    private store: ToDoStore,
    private query: TodoQuery,
    private service: TodosService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loaded$ = this.query.selectLoading();
    this.getTodos();
    this.searchTodos();
  }

  selectTodoIds() {
    // this.query.selectTodoIDs$.pipe(
    //   switchMap(id => this.query.selectMany(id))
    // ).subscribe(data => {
    //   console.log('check');
    //   this.todoList = data;
    //   this.filterListTodos = this.todoList;
    //   this.listSearchTodos = Object.assign([], this.todoList);
    // });
  }

  filter(form: FormControl): void {
    console.log(form.value);
    switch (form.value) {
      case "all":
        this.filterListTodos = this.todoList;
        break;
      case "accomplished":
        this.filterListTodos = this.todoList.filter(
          todo => todo.isDone === true
        );
        break;
      case "unfinished":
        this.filterListTodos = this.todoList.filter(
          todo => todo.isDone === false
        );
        break;
      default:
        break;
    }
  }

  getTodos() {
    this.store.setLoading(true);
    this.service.getAllData().subscribe(data => {
      setTimeout(() => {
        this.store.setLoading(false);
        this.store.add(data);
        this.store.updateToDoIDs(data.map(({id}) => id));
        this.todoList = data;
        this.filterListTodos = this.todoList;
        this.listSearchTodos = Object.assign([], this.todoList);
      }, 2000); // test process bar
    });
  }

  searchTodos() {
    this.searchTerm.valueChanges
      .pipe(
        startWith(""),
        debounceTime(500),
        filter(Boolean)
      )
      .subscribe((term: string) => {
        // this.store.updateSearchTerm(term.trim());
        this.listSearchTodos = this.todoList.filter(
          item =>
            item.content.toLowerCase().indexOf(term.trim().toLowerCase()) !== -1
        );
      });
  }

  // navigate(todo: Todo) {
  //   this.store.setActive(todo.id);
  //   this.router.navigate(["/todo", todo.id]);
  // }

  editTodo(todo: Todo): void {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      width: "500px",
      height: "500px",
      data: todo
    });

    dialogRef.afterClosed().subscribe(item => {
      console.log(item);
      if (item) {
        setTimeout(() => {
          this.query.selectMessageSnackbar$.subscribe(mes => {
            this.openSnackBar(mes);
          });
        }, 300);
        this.getTodos();
      }
    });
  }

  deleteTodo(todo: Todo): void {
    this.service.deleteTodo(todo).subscribe(() => {
      this.query.selectMessageSnackbar$.subscribe(mes => {
        this.openSnackBar(mes);
      });
      this.getTodos();
    });
  }

  openSnackBar(mes: string): void {
    this.snackBar.open(mes, "🍕", {
      duration: 10000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: "snackBar",
      data: { notification: "Nothing ^ ^" }
    });
  }
}
