import React, {useContext, useState} from 'react'
import Context from '../context'
import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import 'animate.css'
import {green} from '@material-ui/core/colors';
// import { black } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import UpdateTodo from './UpdateTodo'

function style(x) {
    return {
        li: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '.5rem 1rem',
            border: '1px solid  #969595',
            borderRadius: '4px',
            marginBottom: '.5rem',
            backgroundColor: x ? 'rgba(0, 0, 0, 0.07)' : '',
        },
        input: {
            marginRight: '1rem'
        },
        text: {
            display: 'flex',
            whiteSpace: 'nowrap',
            overflowX: 'auto',
            maxWidth: 'calc(100%)',
            fontSize: 'x-large',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
        },
        div: {
            display: 'flex'
        }
    }
}

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function TodoItem({playOff, playOn, todo, index, onChange, onCreate, ind, text}) {

    const {removeTodo} = useContext(Context)
    const classes = []
    const [editC, setEdit] = useState(false)

    function edit() {
        setEdit(!editC)
    }

    if (todo.completed) {
        classes.push('done')
    }
    return (
        <li style={style(todo.completed).li}
            className={((todo.new && !todo.delete) && "animate__animated animate__fadeInDown") || (todo.delete && "animate__animated animate__fadeOut") || (todo.original && "animate__animated animate__fadeIn")}>
			<span style={style().text} className={classes.join(' ')}>
			<GreenCheckbox
                color="primary"
                checked={todo.completed}
                type="checkbox"
                style={style().input}
                onChange={() => onChange(todo.id)}
                onMouseUp={() => {
                    todo.completed ? playOff() : playOn()
                }}
            />
			<strong>{index + 1}</strong>
                &nbsp;
                {editC ? <UpdateTodo index={ind} onCreate={onCreate} onEdit={edit} text={text}/> : todo.title}
			</span>
            <div style={style().div}>
                <IconButton aria-label="edit" onClick={() => {
                    edit()
                }} style={{color: '#3f51b5'}}><EditSharpIcon/></IconButton>
                <IconButton aria-label="delete" onClick={removeTodo.bind(null, todo.id)}><HighlightOffSharpIcon
                    style={{color: '#d70015'}}/></IconButton>
            </div>
        </li>
    );
}