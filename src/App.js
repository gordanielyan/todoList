import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList'
import Context from './context'
// import Loader from './loader'
// import Modal from './Modal/Modal'
import firebase from "firebase/app";
import "firebase/database"
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import AddTodo from './Todo/AddTodo'
import Dead from './Dead_Wrong.mp3'
import PlayButton from 'react-play-button'
import useSound from 'use-sound';

const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(216deg, #341ee9, #d81b60)'
    },
});

let config = {
    apiKey: "AIzaSyDJHgrC6_UpyXBqvtUG8IXQRqCqeOtR6jY",
    authDomain: "akinator-7a155.firebaseapp.com",
    databaseURL: "https://akinator-7a155.firebaseio.com",
    projectId: "akinator-7a155",
    storageBucket: "akinator-7a155.appspot.com",
    messagingSenderId: "160786775908",
    appId: "1:160786775908:web:e8fbf98fc4737ffa6c0471"
}

firebase.initializeApp(config);

let database = firebase.database()
let ref = database.ref('test')

/*const AddTodo = React.lazy(() => import('./Todo/AddTodo'));
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}*/
function App() {

    const [todos, setTodos] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [filterType, setFilter] = React.useState(1)
    useEffect(() => {
        /*ref.push({test:'test'})*/
        ref.on('value', (data) => {
            setTodos(data.val() ? Object.values(data.val()) : [])
            setLoading(false)
        }, (err) => {
            console.error(err)
        })
    }, [])

    function toggleTodo(id) {

        ref.set(todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        }).map(i => {
            delete i.new;
            return i
        }))

    }

    function removeTodo(id) {
        ref.set(todos.filter(todo => todo.id !== id).map(i => {
            delete i.new;
            return i
        }))
        setTodos(todos.map((i) => {
            return i.id === id ? {...i, delete: true} : i
        }))
        setTimeout(() => {
                setTodos(todos.filter(todo => todo.id !== id))
            },
            500)
    }

    function addTodo(title) {
        ref.push({
            title,
            id: Date.now(),
            completed: false
        })

        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false,
            new: true,
        }]))
    }

    function editTodo(id, title) {
        ref.set(todos.map(i => {
            if (i.id === id) {
                i.title = title
            }
            return i
        }))
        /*setTodos(todos.map(i=>{
          if (i.id === id) {
            i.title = title
          }
          return i
        }))*/
    }

    function filterTodo(i) {
        setFilter(i)
    }

    const classes = useStyles();
    const [play, {stop, isPlaying}] = useSound(Dead);
    return (
        <Context.Provider value={{removeTodo}}>

            <div className="wrapper css-selector">
                <div style={{marginTop: '.1rem'}}>
                    <PlayButton
                        active={isPlaying}
                        size={60}
                        progressCircleWidth={0}
                        iconColor="#0e141b"
                        idleBackgroundColor="#0e141b"
                        activeBackgroundColor="#3f51b5"
                        play={play}
                        stop={stop}
                    />
                </div>
                <h1>React todo app</h1> 
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button
                        disableElevation{...(filterType === 1 ? {
                        variant: "contained",
                        className: classes.root
                    } : {})} onClick={() => {
                        filterTodo(1)
                    }}>All</Button>
                    <Button disableElevation{...(filterType === 2 ? {
                        variant: "contained",
                        className: classes.root
                    } : {})} onClick={() => {
                        filterTodo(2)
                    }}>Completed</Button>
                    <Button disableElevation{...(filterType === 3 ? {
                        variant: "contained",
                        className: classes.root
                    } : {})} onClick={() => {
                        filterTodo(3)
                    }}>Active</Button>
                </ButtonGroup> 
                <AddTodo onCreate={addTodo}/> 
                {loading && (
                        Array(5).fill(1).map(()=>{
                            return <Skeleton variant="text" width='calc(50%)'
                                             height='11vh'/>
                        })
                )}
                {todos.length ? <TodoList filter={filterType} onCreate={editTodo} todos={todos}
                                          onToggle={toggleTodo}/> : (loading ? null : <p>No todos</p>)}

            </div>
        </Context.Provider>
    );
}

export default App;