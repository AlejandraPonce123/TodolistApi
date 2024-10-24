// src/TodoList.js
import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, updateDoc, doc } from './firebase';

const TodoList = () => {
  const [task, setTask] = useState("");  // Guardar la nueva tarea ingresada por el usuario
  const [tasks, setTasks] = useState([]);  // Guardar la lista de tareas obtenidas de Firebase

  // Cargar las tareas desde Firebase cuando se monta el componente
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));  // Obtenemos las tareas
      const tasksArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksArray);  // Guardamos las tareas en el estado
    };
    
    fetchTasks();  // Llamamos a la función que carga las tareas
  }, []);

  // Función para agregar una nueva tarea
  const addTask = async (e) => {
    e.preventDefault();  // Evitar el refresco de la página
    if (task.trim() === "") return;  // Evitar agregar tareas vacías

    // Agregamos la tarea a Firebase
    await addDoc(collection(db, "tasks"), {
      name: task,
      completed: false  // Inicialmente, la tarea no está completada
    });

    setTask("");  // Limpiar el campo de texto
    
    // Recargamos las tareas para incluir la nueva
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const tasksArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTasks(tasksArray);
  };

  // Función para marcar una tarea como completada
  const completeTask = async (taskId) => {
    const taskDoc = doc(db, "tasks", taskId);
    await updateDoc(taskDoc, { completed: true });  // Actualizamos el campo `completed`

    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);  // Actualizamos la lista de tareas
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? "line-through" : "" }}>
            {task.name}
            {!task.completed && (
              <button onClick={() => completeTask(task.id)}>Complete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
