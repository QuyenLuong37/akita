import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { Todo } from "../../state/todos.model";
import { distinctUntilChanged } from "rxjs/operators";
import { TodosService } from '../../state/todos.service';
import { ToDoStore } from '../../state/todos.store';

@Component({
  selector: "app-todo-dialog",
  templateUrl: "./todo-dialog.component.html",
  styleUrls: ["./todo-dialog.component.scss"]
})
export class TodoDialogComponent implements OnInit {
  todoForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    private service: TodosService,
    private store: ToDoStore
  ) {}

  ngOnInit() {
    this.todoForm = this.builder.group({
      content: [this.data.content, Validators.required],
      isDone: [this.data.isDone]
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  saveTodo(): void {
    const changes = {
      ...this.data,
      ...this.todoForm.value
    };
    this.service.putTodo(changes).pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
