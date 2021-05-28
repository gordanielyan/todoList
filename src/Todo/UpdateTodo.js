import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
/*marginBottom:'1rem'*/
const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "calc(100%)"
}

function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);
    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function UpdateTodo({index, onCreate, onEdit, text}) {
    const input = useInputValue(text)

    function submitHandler(event) {
        event.preventDefault()

        if (input.value().trim()) {
            onCreate(index, input.value())
            input.clear()
            onEdit()
            // setValue('')
        }
    }

    return (
        <form style={style} onSubmit={submitHandler} autoComplete="off">
            <TextField {...input.bind} id="standard-basic" margin="none" fullWidth/>
            <IconButton color="primary" aria-label="add to shopping cart" type="submit">
                <DoneIcon/>
            </IconButton>
        </form>
    )
}

export default UpdateTodo