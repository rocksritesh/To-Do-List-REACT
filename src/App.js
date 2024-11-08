import "./App.css";
import { useState } from "react";

function App() {
  let [todolist, setTodolist] = useState([]);
  let [isEditing, setIsEditing] = useState(false);
  let [currentTodo, setCurrentTodo] = useState("");
  let [editIndex, setEditIndex] = useState(null);

  // Save a new to-do or update an existing one
  let saveToDoList = (event) => {
    event.preventDefault();
    let toname = event.target.elements.toname.value;

    if (isEditing) {
      // Edit the current todo
      let updatedTodos = [...todolist];
      updatedTodos[editIndex] = toname;
      setTodolist(updatedTodos);
      setIsEditing(false);
      setCurrentTodo("");
      setEditIndex(null);
    } else {
      // Add new todo
      if (toname && !todolist.includes(toname)) {
        setTodolist([...todolist, toname]);
      } else if (todolist.includes(toname)) {
        alert("ToDo-name already exists...");
      }
    }

    event.target.elements.toname.value = ""; // Clear the input field after submission
  };

  // Delete a specific todo
  let deleteTodo = (index) => {
    let updatedTodos = todolist.filter((_, i) => i !== index);
    setTodolist(updatedTodos);
  };

  // Start editing a specific todo
  let editTodo = (index) => {
    setCurrentTodo(todolist[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Map through the todo list
  let list = todolist.map((value, index) => (
    <ToDoListItems
      key={index}
      value={value}
      index={index}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
    />
  ));

  return (
    <div className="App">
      <h1>ToDo-List</h1>
      <form onSubmit={saveToDoList}>
        <input
          type="text"
          name="toname"
          defaultValue={currentTodo}
          placeholder="Enter a task"
        />
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>

      <div className="outerDiv">
        <ul>{list}</ul>
      </div>
    </div>
  );
}

export default App;

function ToDoListItems({ value, index, deleteTodo, editTodo }) {
  return (
    <li>
      {value}{" "}
      <span
        onClick={() => deleteTodo(index)}
        style={{ cursor: "pointer", color: "black" }}
      >
        &times;
      </span>{" "}
      <button className="edit" onClick={() => editTodo(index)}>
        Edit
      </button>
    </li>
  );
}
