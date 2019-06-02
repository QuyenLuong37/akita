import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ToDoState, ToDoStore } from './todos.store';
import { Todo } from './todos.model';

@Injectable({
  providedIn: 'root'
})
export class TodoQuery extends QueryEntity<ToDoState, Todo> {
  selectSearchTerm$ = this.select(state => state.searchTerm);
  selectMessageSnackbar$ = this.select(state => state.snackbarMessage);
  selectTodoIDs$ = this.select(state => state.toDoIDs);
  constructor(
    protected store: ToDoStore
  ) {
    super(store);
  }


}
