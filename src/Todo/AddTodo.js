import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
/*marginBottom:'1rem'*/
const style = {
    display: "flex",
    marginBottom: "1rem",
    alignItems: "center",
    justifyContent: "center",
    width: "calc(50%)"
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

function AddTodo({onCreate}) {
    const input = useInputValue('')

    function submitHandler(event) {
        event.preventDefault()

        if (input.value().trim()) {
            onCreate(input.value())
            input.clear()
            // setValue('')
        }
    }

    return (
        <form style={style} onSubmit={submitHandler} autoComplete="off">
            <TextField {...input.bind} id="standard-basic" placeholder="Add todo" margin="normal" fullWidth/>
            <IconButton color="primary" aria-label="add to todo" type="submit">
                <AddCircle/>
            </IconButton>
        </form>
    )
}

export default AddTodo