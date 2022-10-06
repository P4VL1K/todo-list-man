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


export type FilterType = 'all' | 'completed' | 'active'

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: true},
        ]
    })

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    const removeTask = (id: string, todolistId: string) => {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    const changeFilter = (value: FilterType, todolistId: string) => {
        dispatchToTodolist(ChangeTodolistFilterAC(todolistId, value))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    const removeTodolist = (id: string) => {
        dispatchToTodolist(RemoveTodolistAC(id))
        dispatchToTasks(RemoveTodolistAC(id))
    }

    const addTodolist = (title: string) => {
        dispatchToTodolist(AddTodolistAC(title))
        dispatchToTasks(AddTodolistAC(title))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

    const changeTodolistTitle = (title: string, todolistId: string) => {
        dispatchToTodolist(ChangeTodolistTitleAC(todolistId, title))
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

export default App;