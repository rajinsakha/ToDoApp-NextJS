 'use client'

import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import { fetchTasks } from '@/lib/features/tasks/tasksSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useEffect } from 'react'
import Menu from './components/Menu'

export default function Home() {
  const taskStatus = useAppSelector((state)=>state.tasksReducer.status);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(taskStatus === 'idle'){
      dispatch(fetchTasks());
    }
  },[taskStatus,dispatch])

 const tasks = useAppSelector((state)=>state.tasksReducer.tasks);

//  const completedTasks = tasks.filter((task)=> task.completed !== false);

//  const pendingTasks = tasks.filter((task)=> task.completed === false);




  return (
    <main className="min-h-screen max-[400px]:px-4 px-8 sm:px-24 py-8 bg-[#3f72af]">
      <h1 className='text-center text-6xl font-semibold mb-4 text-white '>To Do List</h1>
      <div className='w-full relative max-w-[550px] mx-auto mt-1 bg-[#f9f7f7] p-4 rounded-lg'>
        <AddTask />
        <TaskList taskType={tasks} taskTitle='All Tasks' />
        {/* <Menu /> */}
      </div>
     
    </main>
  )
}
