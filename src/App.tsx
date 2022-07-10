import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterType = 'all' | 'completed' | 'active'

type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: true},
    // ])

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const removeTask = (id: string, todolistId: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterType, todolistId: string) => {
        let todolist = todolists.find(t => t.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }

    }

    const addTask = (title: string, todolistId: string) => {
        let task = {id: v1(), title: title, isDone: true}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(t => t.id !== id))
        delete tasks[id]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(t => {
                let allTodolistTasks = tasks[t.id]
                let tasksForTodolist = allTodolistTasks

                if (t.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone === false)
                }
                if (t.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(task => task.isDone === true)
                }
                return <Todolist
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
                />
            })}
        </div>
    );
}

export default App;
