import React, { useState } from "react";
import { TaskType } from '../types'

interface TaskInputProps {
  addTask: (task: TaskType) => void;
}

function TaskInput(props: TaskInputProps) {
  const [input, setInput] = useState('');
  const [id, setId] = useState<number>(0)

  const addTaskHandler = () => {
    const newTask = {
      id: id,
      content: input,
      done: false
    };

    props.addTask(newTask);
    setId((prev) => prev + 1)
    setInput('');
  }

  return (
    <div className="w-screen flex justify-center items-center gap-5 mb-10">
      <input
        onChange={e => setInput(e.target.value)}
        className="h-10 w-[40vw] border rounded-xl border-grey pl-3"
        type="text"
        placeholder="Enter a task"
        value={input}
      ></input>
      <button onClick={addTaskHandler} className=' w-10 h-10 flex justify-center items-center hover:bg-gray-400 hover:bg-opacity-50 p-2 rounded-full transition duration-200 ease-in'>
        <i className="material-icons">add</i>
      </button>
    </div>
  );
}

export default TaskInput;
