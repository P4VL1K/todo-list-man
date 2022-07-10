import React, {ChangeEvent, useState} from 'react';
import {FilterType} from "./App";

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
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => {props.changeFilter('all', props.id)}
    const onActiveClickHandler = () => { props.changeFilter('active', props.id)}
    const onCompletedClickHandler = () => { props.changeFilter('completed', props.id)}

    const onClickDeleteHandler = () => {
        props.removeTodolist(props.id)
    }

return <div>
    <h3>{props.title}<button onClick={onClickDeleteHandler}>x</button></h3>
    <div>
        <input
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
    <ul>
        {props.tasks.map(t => {
            const onClickHandler = () => {
                props.removeTask(t.id, props.id)
            }
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked
                props.changeTaskStatus(t.id, newIsDoneValue, props.id)
            }
                return (
                    <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                        <input type='checkbox' checked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x
                        </button>
                    </li>)
            }
        )}
    </ul>
    <div>
        <button
            onClick={onAllClickHandler}
            className={props.filter === 'all' ? 'active-filter' : ''}
        >All</button>
        <button
            onClick={onActiveClickHandler}
            className={props.filter === 'active' ? 'active-filter' : ''}
        >Active</button>
        <button
            onClick={onCompletedClickHandler}
            className={props.filter === 'completed' ? 'active-filter' : ''}
        >Completed</button>
    </div>
</div>
}
