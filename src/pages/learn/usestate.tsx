import React, { useState } from 'react';
import * as Icon from 'react-feather';
import { useForm } from './useForm';

const dataStatic = [
  {
    text: 'learn react',
    isCompleted: false
  },
  {
    text: 'learn vue',
    isCompleted: false
  },
  {
    text: 'learn angular',
    isCompleted: false
  },
]

// component todo list
function Todo(props) {
  return (
    <>
      <div className=" bg-green-400 flex flex-row justify-center items-center">
        <span
          className={
            props.todo.isCompleted === true ?
              "w-full p-2 line-through" :
              "w-full p-2"
          }
        >
          {props.todo.text}
        </span>

        <div className="bg-red-600 rounded-full h-6 w-6 p-2 mr-2 flex items-center justify-center hover:bg-red-800">
          {
            props.todo.isCompleted === false ?
              <button
                className="font-bold hover:text-white focus:rounded-full border-transparent"
                onClick={() => {
                  props.completeTodo(props.index)
                }}
              >
                <Icon.Check size={20} className="" />
              </button>
              :
              <button
                className="font-bold hover:text-white focus:rounded-full border-transparent"
                onClick={() => {
                  props.resetTodo(props.index)
                }}
              >
                <Icon.X size={20} className="" />
              </button>
          }
        </div>
      </div>
    </>
  );
}

// component todoform
function TodoForm({ addTodo }) {
  const [value, setvalue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setvalue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border shadow-md rounded-md p-1 mb-2"
        placeholder="add todo"
        value={value}
        onChange={(e) => {
          setvalue(e.target.value)
        }}
      />
    </form>
  );
}

const usestate = () => {
  const [todos, settodos] = React.useState(dataStatic);
  const [values, handleChange] = useForm({ email: '', password: '' });

  // menambah data todo
  const addTodo = (text) => {
    // [...todos] untuk mengambil semua data
    // [...todos, {text, isCompleted: false}] untuk menambahkan data baru ke todos
    const newTodos = [...todos, { text: text, isCompleted: false }]
    console.log(newTodos)
    settodos(newTodos)
  }

  // set completed to true
  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    settodos(newTodos)
  }

  // set completed to false
  const resetTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    settodos(newTodos)
  }

  return (
    <div className="m-3">
      <div className="text-center text-6xl font-bold">
        Learn Hooks
      </div>

      <div className="text-3xl font-bold mb-5">1. useState todolist</div>

      <div className="mt-3 bg-orange-400 p-3 w-6/12 m-auto rounded-lg shadow-md">
        <TodoForm
          addTodo={addTodo}
        />
        <div className="font-bold rounded-md border shadow-md">
          {todos.map((todo: any, index: any) => {
            // console.log(todo.text)
            return (
              <Todo
                key={index}
                index={index}
                todo={todo}
                completeTodo={completeTodo}
                resetTodo={resetTodo}
              />
            )
          })}

        </div>
      </div>

      <div className="mt-3 text-3xl font-bold mb-5">
        2. useState custom hooks
      </div>
      <div className="mt-3 mb-6 bg-orange-400 p-3 w-6/12 m-auto rounded-lg shadow-md">
        <input
          type="text"
          className="border w-full shadow-md rounded-md p-1 mb-2"
          placeholder="email"
          value={values.email}
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          className="border w-full shadow-md rounded-md p-1 mb-2"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
          name="password"
        />
        <div className="font-bold text-black">{values.email}</div>
        <div className="font-bold text-black">{values.password}</div>
      </div>


    </div>
  );
}

export default usestate;