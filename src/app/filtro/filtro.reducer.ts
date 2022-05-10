import { Action, createReducer, on } from '@ngrx/store';
import { filtrosValidos, setFiltro } from '../filtro/filtro.actions';

export const estadoInicial: filtrosValidos = 'todos';

export const _filtroReducer = createReducer<filtrosValidos, Action>(
    estadoInicial,
    on(setFiltro, (state, { filtro }) => filtro)

);

export function filtroReducer(state, action) {
    return _filtroReducer(state, action)
}

