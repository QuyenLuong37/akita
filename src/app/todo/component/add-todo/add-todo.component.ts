import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodosService } from '../../state/todos.service';
import { Router } from '@angular/router';
import { Todo } from '../../state/todos.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  addForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private service: TodosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.addForm = this.builder.group({
      content: ['', Validators.required],
      isDone: [false, Validators.required]
    });
  }

  addTodo(form: any): void {
    console.log(form.value);
    const date = new Date();
    const id = date.getTime();
    const todo: Todo = {
      id,
      ...form.value
    };
    this.service.addTodo(todo).subscribe(() => {
      this.router.navigate(['/todo-list']);
    });
  }

}
