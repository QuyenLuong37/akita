import { Injectable } from '@angular/core';
import { EntityStore, StoreActions, StoreConfig, EntityState, ID } from '@datorama/akita';
import { Todo } from './todos.model';

export interface ToDoState extends EntityState<Todo> {
  searchTerm: string;
  snackbarMessage: string;
  toDoIDs: ID[];
}

const initialState: ToDoState = {
  searchTerm: '',
  snackbarMessage: '',
  toDoIDs: []
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({name: 'todos'})
export class ToDoStore extends EntityStore<ToDoState, Todo> {

  constructor() {
    super(initialState);
  }

  updateToDoIDs(toDoIDs: ID[]) {
    this.update({toDoIDs});
  }

  updateSearchTerm(term: string): void {
    this.update({term});
  }

  updateSnackBarMessage(snackbarMessage: string): void {
    this.update({snackbarMessage});
  }
}
