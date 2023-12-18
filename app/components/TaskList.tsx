"use client";

import React from 'react'
import { useAppSelector } from '@/lib/hooks'
import Task from './Task';

interface TaskListProps{
  taskType: any;
  taskTitle: string;
}




const TaskList:React.FC<TaskListProps> = ({taskType, taskTitle}) => {
    const taskStatus = useAppSelector((state)=>state.tasksReducer.status);
    
    const errors = useAppSelector((state)=> state.tasksReducer.error);

    let content:any;


    if (taskStatus === "loading") {
      content = <h1>...Loading</h1>;
    } else if (taskStatus === "success") {
      //Tasks array is iterated using map function and for each task, a Task component is created with a unique key and task is provided as props to it.
      content = taskType.map((task:any) => <Task key={task.id} task={task} />);
    } else if (taskStatus === "failed") {
      content = <p>{errors}</p>;
    }

 
  return (
         <>
      <h2 className="text-center text-2xl font-medium py-1 mb-3 border-y-2 border-y-blue-500">{taskTitle}</h2>
      <div className="max-h-[325px] flex flex-col gap-4 overflow-y-auto py-4 px-10 max-sm:p-4 mb-4 ">{content}</div>
    </>
    


  )
}

export default TaskList