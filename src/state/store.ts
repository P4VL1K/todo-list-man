import { tasksReducer } from './tasks-reducer'
import { todolistsReducer } from './todolists-reducer'
import { combineReducers, createStore } from 'redux'

// ��������� reducer-� � ������� combineReducers,
// �� ����� ��������� ������ ������������� �������-���������
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// ��������������� ������ store
export const store = createStore(rootReducer)
// ���������� ������������� ��� ����� ������� ���������
export type AppRootStateType = ReturnType<typeof rootReducer>
// � ���, ����� ����� ���� � ������� �������� ���������� � store � ����� ������
// @ts-ignore
window.store = store
