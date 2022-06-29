import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterType = 'all' | 'completed' | 'active'


function App() {

    let [filter, setFilter] = useState<FilterType>('all')
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: true },
    ])

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        let task = {id: v1(),title: title, isDone: true}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>
        </div>
    );
}

export default App;
