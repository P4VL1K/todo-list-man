import React, {ChangeEvent} from 'react';
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (id: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    // const addTask = () => {
    //     if (title.trim() !== '') {
    //         props.addTask(title.trim(), props.id)
    //         setTitle('')
    //     } else {
    //         setError('Title is required')
    //     }
    // }

    const onAllClickHandler = () => {props.changeFilter('all', props.id)}
    const onActiveClickHandler = () => { props.changeFilter('active', props.id)}
    const onCompletedClickHandler = () => { props.changeFilter('completed', props.id)}

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

return <div>
    <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist}>
            <Delete/>
        </IconButton>
    </h3>
    <div>
        <AddItemForm addItem={addTask}/>
    </div>
    <ul>
        {props.tasks.map(t => {
            const onClickHandler = () => {
                props.removeTask(t.id, props.id)
            }
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked
                props.changeTaskStatus(t.id, newIsDoneValue, props.id)
            }
            const onChangeTitleHandler = (newValue: string) => {
                props.changeTaskTitle(t.id, newValue, props.id)
            }
                return (
                    <div key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                        <Checkbox checked={t.isDone} color='primary' onChange={onChangeStatusHandler}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>)
            }
        )}
    </ul>
    <div>
        <Button
            onClick={onAllClickHandler}
            variant={props.filter === 'all' ? 'outlined' : 'text'}
        >All</Button>
        <Button
            onClick={onActiveClickHandler}
            variant={props.filter === 'active' ? 'outlined' : 'text'}
        >Active</Button>
        <Button
            onClick={onCompletedClickHandler}
            variant={props.filter === 'completed' ? 'outlined' : 'text'}
        >Completed</Button>
    </div>
</div>
}
