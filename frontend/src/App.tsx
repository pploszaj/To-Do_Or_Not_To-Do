import TaskInput from "./components/TaskInput";
import React, { useState } from "react";
import TaskList from "./components/TaskList";
import axios from 'axios';
import { TaskType } from './types'


function App() {

  const [list, setList] = useState<TaskType[]>([])

  const addTaskHandler = async (task: TaskType) => {
    setList((prev) => [...prev, task])
    //send post request to server for adding a new task
    await axios.post('/tasks', task);
  }

  const markAsDoneHandler = async (id:number) => {
    const updatedTaskList = list.map(task => task.id === id ? {...task, done: !task.done } : task)
    setList(updatedTaskList);
    //send a patch request to the server with the id for toggling done status
    await axios.patch(`/tasks/${id}`);
  }

  const deleteTaskHandler = async (id: number) => {
    //send delete request to delete task
    setList(prev => prev.filter(task => task.id !== id))
    await axios.delete(`/tasks/${id}`);
  }

  return (
    <>
      <h1 className="text-center text-6xl mt-10 mb-10 font-raleway">To-Do (or Not To-Do) App</h1>
      <TaskInput addTask = {addTaskHandler} />
      <TaskList list = {list} deleteTask = {deleteTaskHandler} markAsDone = {markAsDoneHandler}/>
    </>
  );
}

export default App;
