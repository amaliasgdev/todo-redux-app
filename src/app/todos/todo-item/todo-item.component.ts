import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from '../models/todo.model';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todos.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todoInput: Todo;
  //hace referencia al elemento físico html
  @ViewChild('inputFisico') txtInputFisico: ElementRef;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando: boolean;

  constructor(private store: Store<AppState>) {
    this.editando = false;
  }

  ngOnInit(): void {
    this.createForm(this.todoInput);
  }

  createForm(todo: Todo) {
    this.chkCompletado = new FormControl(todo.completado);
    this.txtInput = new FormControl(todo.texto,
      Validators.required)

    this.chkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toggle({ id: this.todoInput.id }))
    });
  }

  editar() {
    //1. Pasar la propiedad a true para que salte la class 'editando' del css
    this.editando = true;
    this.txtInput.setValue(this.todoInput.texto);
    //2. Para que tenga el foco el Input. Podemos usar focus() o select(). Focus() solo da foco y select() selecciona todo el texto
    setTimeout(() => {
      this.txtInputFisico.nativeElement.focus();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) { return }
    if (this.txtInput.value === this.todoInput.texto) { return }
    this.store.dispatch(actions.editar({
      id: this.todoInput.id,
      texto: this.txtInput.value
    }))
  }

  borrar() {
    this.store.dispatch(actions.borrar({ id: this.todoInput.id }))
  }



}