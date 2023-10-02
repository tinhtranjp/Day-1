import React from "react";
import { Task } from "../models/Task";

interface TaskProps {
  task: Task;
  onUpdate: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, onUpdate, onDelete }) => {
  return (
    <div className="mt-3">
      <span>ID: {task.id}</span>
      <span className="ml-4 first-letter:uppercase">{task.text}</span>
      <button
        className="ml-10 bg-green-700 p-1 px-3 rounded-sm"
        onClick={() => onUpdate(task.id)}
      >
        Update
      </button>
      <button
        className="ml-10 bg-red-700 p-1 px-3 rounded-sm"
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskComponent;
