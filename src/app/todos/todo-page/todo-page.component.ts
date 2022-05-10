import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todos.actions';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent implements OnInit {

  completado: boolean;

  constructor(private store: Store<AppState>) {
    this.completado = false;
  }

  ngOnInit(): void {
  }

  toggleAll() {
    this.completado = !this.completado;
    this.store.dispatch(actions.toggleAll({ completado: this.completado }));
  }

}
