import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormType) => {

    console.log('AddItemForm called')

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField onChange={onChangeHandler} autoFocus
                       value={title}
                       onKeyPress={onKeyPressHandler}
                       error={!!error}
                       label='Title'
                       helperText={error}
            />
            <IconButton
                color='primary'
                onClick={addItem}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})