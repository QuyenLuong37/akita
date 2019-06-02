import { Component, OnInit } from '@angular/core';
import { ToDoStore } from '../../state/todos.store';
import { TodoQuery } from '../../state/todos.query';
import { Todo } from '../../state/todos.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../../state/todos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  todoDetail$: Observable<any>;
  constructor(
    private store: ToDoStore,
    private query: TodoQuery,
    private route: ActivatedRoute,
    private service: TodosService,
    private location: Location
  ) {  }

  ngOnInit() {
    this.todoDetail$ = this.query.selectActive();
    // this.query.selectActive().subscribe(v => console.log(v));
    const id = this.route.snapshot.paramMap.get('id');
    this.service.setActive(id);
  }

  goBack(): void {
    this.location.back();
  }
}
