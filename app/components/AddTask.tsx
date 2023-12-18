'use client';
import React, {useState, ChangeEvent, FormEvent} from 'react';
import { taskAdded } from '@/lib/features/tasks/tasksSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/lib/hooks';


const AddTask = () => {


    const [title,setTitle] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);

    const dispatch = useAppDispatch();
   
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value);
    } 

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      if(title){
        dispatch(taskAdded({id:nanoid(),title, completed}));
        setTitle("");
        setCompleted(false);
      }
    }


  return (
    <div className='flex flex-col justify-center items-center gap-4 p-4 '>
        <h1 className='text-center text-2xl font-medium'>Add Task</h1>
        <form className='flex' onSubmit={handleSubmit}>
            <input className='h-8 w-64 max-[450px]:w-full pl-2 rounded-l-md bg-[#dbe2ef]' type="text" name="title" id="title" value={title} onChange={handleTitleChange} />
            <button className='bg-green-500 h-8 text-white px-4 rounded-r-md'>Add</button>
        </form>
    </div>

  )
}

export default AddTask