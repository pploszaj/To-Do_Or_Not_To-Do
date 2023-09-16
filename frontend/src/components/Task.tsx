import React, {useState} from "react";
import { TaskType } from "../types";
import './Task.css'

interface TaskProps {
  task: TaskType;
  deleteTask: (id: number) => void;
  markAsDone: (id:number) => void;
}

function Task(props: TaskProps) {

  const [deleting, setDeleting] = useState(false);

  const deleteHandler = (id: number) => {
    setDeleting(true);
    setTimeout(() => {
      props.deleteTask(id);
    }, 500)
    
  }

  return (
    <div className={`${deleting ? 'slide-out' : 'slide-in'} w-[40vw] border border-gray-500 rounded-xl h-12 pl-4 flex items-center justify-between pr-4`} style={{backgroundColor: props.task.done ? 'green' : 'inherit', transition: 'background-color 0.3s ease-in-out'}}>
      <h1 className="scrollbar mr-3 overflow-scroll">{props.task.content}</h1>
      <div className="flex gap-2">
        <button onClick={() => props.markAsDone(props.task.id)}>✅</button>
        <button onClick={() => deleteHandler(props.task.id)}>❌</button>
      </div>
    </div>
  );
}

export default Task;
