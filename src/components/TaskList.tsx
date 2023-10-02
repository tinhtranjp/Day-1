import React, { useState, useRef } from "react";
import { Task } from "../models/Task";
import TaskComponent from "./TaskComponent";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const updateTask = (taskId: number) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setInputText(taskToEdit.text);
      setEditingTaskId(taskId);
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const addTask = () => {
    if (inputText.trim() !== "") {
      if (editingTaskId) {
        setTasks(
          tasks.map((task) =>
            task.id === editingTaskId ? { ...task, text: inputText } : task
          )
        );
        setEditingTaskId(null);
      } else {
        const newTask = new Task(Date.now(), inputText);
        setTasks([...tasks, newTask]);
      }
      setInputText("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  const deleteTask = (taskId: number) => {
    if (window.confirm("Bạn có muốn xóa task này không?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };
  return (
    <div>
      <input
        className="border rounded border-black p-2 min-w-[600px]"
        ref={inputRef}
        type="text"
        placeholder="Add a new task"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />
      <button
        className="bg-red-400 px-5 py-2 rounded-sm ml-2"
        onClick={addTask}
      >
        {editingTaskId ? "Update" : "Add task"}
      </button>
      <ul className="mt-16">
        {tasks.map((task) => (
          <TaskComponent
            key={task.id}
            task={task}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
