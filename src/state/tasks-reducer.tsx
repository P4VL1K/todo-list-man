import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type:'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType |  ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

//================================ REDUCER ====================================

export const tasksReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        default:
            return state
    }
}

//================================ ACTION CREATORS ====================================

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => ({type: 'REMOVE-TASK', taskId, todolistId})
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => ({type: 'ADD-TASK',title, todolistId})
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => ({type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId})
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => ({type: 'CHANGE-TASK-TITLE', taskId, title, todolistId})