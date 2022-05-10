import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle, editar, borrar, toggleAll, limpiarCompletados } from './todos.actions';

export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Iron Man'),
    new Todo('Robar escudo del Capitan América')

];

export const _todoReducer = createReducer(
    estadoInicial,

    on(crear, (state, { texto }) => [...state, new Todo(texto)]),

    on(toggle, (state, { id }) => {
        //map crea un nuevo arreglo. no podemos manipular el array original
        return state.map(todo => {
            if (todo.id === id) {
                //esto se hace para crear un nuevo objeto y no mutar el original
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }
        })
    }),

    on(editar, (state, { id, texto }) => state.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                texto: texto
            }
        } else {
            return todo;
        }
    })),

    on(borrar, (state, { id }) => {
        //filter regresa un nuevo array, no muta el array original
        //devuelve todos lo todo que tienen un id distinto al que pasamos
        return state.filter(todo => todo.id !== id)
    }),

    on(toggleAll, (state, { completado }) => state.map(todo => {
        return {
            ...todo,
            completado: completado
        }
    })),

    on(limpiarCompletados, (state) => state.filter(todo => !todo.completado))

);

export function todoReducer(state: any, action: any) {
    return _todoReducer(state, action)
}