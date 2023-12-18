 'use client';

import React,{useState, FormEvent, ChangeEvent} from 'react'
import { useAppDispatch } from '@/lib/hooks'
import { taskDeleted, taskToggled, taskEdited } from '@/lib/features/tasks/tasksSlice';
 
interface TaskProps {
    task: {
      id: string;
      title: string;
      completed: boolean;
    };
  }

const Task:React.FC<TaskProps> = ({task}) => {

    const [title,setTitle] = useState<string>(task.title);
    const [completed, setCompleted] = useState<boolean>(task.completed);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    

    const dispatch = useAppDispatch();
   
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value);
    } 

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(title){
        dispatch(taskEdited({id:task.id,title, completed}));
        setIsEditing(false);
      }    
    }
 

  return (
    <>
   {!isEditing ? (
     <div className='flex items-center justify-between gap-4 py-2 px-2 bg-[#dbe2ef] mb-3'>
     <input type="checkbox"  checked={task.completed} onChange={()=>dispatch(taskToggled(task.id))} />
     <h3 className='text-base max-[500px]:text-sm' style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.title}</h3>
     <div className='flex gap-2 max-[500px]:flex-col'>
     <button className='bg-green-600 px-3 py-1 cursor-pointer text-white max-[500px]:text-sm' onClick={()=>setIsEditing(true)}>Edit</button>
     <button className='bg-orange-600 px-3 py-1 cursor-pointer text-white max-[500px]:text-sm' onClick={()=>dispatch(taskDeleted(task.id))}>Delete</button>
     </div>
 </div>
   ):(
    <form className='flex items-center justify-between gap-8 py-1 px-2  bg-[#dbe2ef] mb-3 ' onSubmit={handleSubmit}>
            <input type="checkbox" checked={completed} onChange={()=>setCompleted(!completed)}  />
            <input className='p-2 w-full bg-[#dbe2ef] ' type="text" name="title" id="title" value={title} onChange={handleTitleChange} />
            <button className='bg-green-600 text-white px-3 py-1 '>Save</button>
        </form>
   )}
   
    </>
  )

}

export default Task