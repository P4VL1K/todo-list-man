import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(st => st.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(st => st.tasks)
    const dispatch = useDispatch()

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }

    const changeFilter = (value: FilterType, todolistId: string) => {
        dispatch(ChangeTodolistFilterAC(todolistId, value))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    const removeTodolist = (id: string) => {
        dispatch(RemoveTodolistAC(id))
    }

    const addTodolist = (title: string) => {
        dispatch(AddTodolistAC(title))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatch(ChangeTodolistTitleAC(todolistId, title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color='inherit'>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '25px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(t => {
                        let allTodolistTasks = tasks[t.id]
                        let tasksForTodolist = allTodolistTasks

                        if (t.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone === false)
                        }
                        if (t.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone === true)
                        }
                        return <Grid item>
                            <Paper style={{padding: '15px'}}>
                                <Todolist
                                    key={t.id}
                                    id={t.id}
                                    title={t.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={t.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;