import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos } from 'src/app/filtro/filtro.actions';
import { setFiltro } from '../../filtro/filtro.actions'
import { limpiarCompletados } from '../todos.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos;
  filtros: filtrosValidos[];
  pendientes: number;

  constructor(private store: Store<AppState>) {
    this.filtroActual = 'todos';
    this.filtros = ['todos', 'completados', 'pendientes'];
    this.pendientes = 0;
  }

  ngOnInit(): void {
    /* this.store.select('filtro').subscribe(filtro => {
      this.filtroActual = filtro;
    }); */
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length
    });
  }

  cambiarFiltro(filtro: filtrosValidos) {
    console.log(filtro);
    this.store.dispatch(setFiltro({ filtro: filtro }));
  }

  LimpiarCompletados() {
    this.store.dispatch(limpiarCompletados())
  }

}
