import {FilterType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [
                ...state, {id: v1(), title: action.title, filter: 'all'}
            ]
        case 'CHANGE-TODOLIST-TITLE':
            //return state.filter(tl => tl.id !== action.id ? tl : {...tl, title: action.title})
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            let todolistF = state.find(tl => tl.id === action.id)
            if (todolistF) {
                todolistF.filter = action.filter
            }
            return [...state]
        default:
            throw new Error('I don\'t understand this type')
    }
}

//================================== ACTIONS ==========================================

export const RemoveTodolistAC= (id: string): RemoveTodolistActionType => ({type: "REMOVE-TODOLIST", id})
export const AddTodolistAC = (title: string): AddTodolistActionType => ({type: "ADD-TODOLIST", title})
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => ({type: "CHANGE-TODOLIST-TITLE", id, title})
export const ChangeTodolistFilterAC = (id: string, filter: FilterType): ChangeTodolistFilterActionType => ({type: "CHANGE-TODOLIST-FILTER", id, filter})

