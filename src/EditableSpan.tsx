import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    console.log('EditableSpan called')

    const [value, setValue] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={value}
                     autoFocus
                     onBlur={activateViewMode}
                     onChange={onChangeHandler}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
})