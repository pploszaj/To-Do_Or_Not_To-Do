import Task from "./Task";
import {TaskType} from '../types'

interface TaskListProps {
  list: TaskType[];
  deleteTask: (id:number) => void;
  markAsDone: (id:number) => void;
}

function TaskList(props: TaskListProps) {
  return (
    <div className="w-screen flex items-center flex-col gap-4">
      {props.list.map((task, index) => (
        <Task task={task} key={task.id} deleteTask={props.deleteTask} markAsDone={props.markAsDone}/>
      ))}
    </div>
  );
}

export default TaskList;
