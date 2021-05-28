import React from 'react'
import TodoItem from './TodoItem'
// import UpdateTodo from './UpdateTodo'
import useSound from 'use-sound';
// import offSfx from './pop_up-off.mp3';
import onSfx from './pop_up-on.mp3';
import tickSfx from './tick.mp3';
import Grow from '@material-ui/core/Grow';

const styles = {
    ul: {
        maxWidth: 'calc(95%)',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        minWidth: 'calc(50%)',
    }
}

export default function TodoList(props) {
    const [playOn] = useSound(
        tickSfx
    );
    const [playOff] = useSound(
        onSfx
    );
    return (
        <ul style={styles.ul} className="my-list">
        	{props.todos.map((todo, i) => {
                if (props.filter === 2 && todo.completed)
                    return <TodoItem playOff={playOff} playOn={playOn} todo={todo} key={todo.id} index={i}
                                     onChange={props.onToggle} onCreate={props.onCreate} ind={todo.id}
                                     text={todo.title}/>
                if (props.filter === 3 && !todo.completed)
                    return <TodoItem playOff={playOff} playOn={playOn} todo={todo} key={todo.id} index={i}
                                     onChange={props.onToggle} onCreate={props.onCreate} ind={todo.id}
                                     text={todo.title}/>
                if (props.filter === 1)
                    return <TodoItem playOff={playOff} playOn={playOn} todo={todo} key={todo.id} index={i}
                                     onChange={props.onToggle} onCreate={props.onCreate} ind={todo.id}
                                     text={todo.title}/>
            })}
        </ul>
    )
}