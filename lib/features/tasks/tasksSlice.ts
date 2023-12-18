import { createAsyncThunk, createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit"

// Creating Task interface for type declaration
interface Task {
    id: string;
    title: string;
    completed: boolean;
  }

 //Creating State interface for type declaration
interface TodoState{
    tasks: Task[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null | undefined;
}


const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos'

const initialState: TodoState = {
    tasks:[],
    status:'idle',
    error:null
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async()=>{
    const response = await fetch(TASKS_URL);
    const tasks:Task[] = await response.json();
    return tasks;
})

export const tasksSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        // Function created for adding task
        taskAdded(
           state, action: PayloadAction<Task>){
                state.tasks = [action.payload,...state.tasks]; //The value of tasks is set to value obtained from action.payload  when the method is called and a copy of previous tasks array is created and all these values are added into new array which is provided to state.tasks.
            },
        taskToggled(state, action: PayloadAction<string>){
                // Searching the id of the task to be toggled
                const toggledTask = state.tasks.find((task)=> task.id === action.payload);
                // If there exists the toggledTask, changing its boolean status from true to false or false to true
                if(toggledTask){
                    toggledTask.completed = !toggledTask.completed;
                }
        
        },
        taskEdited(state, action:PayloadAction<Task>){
         const editedTask = state.tasks.find((task)=>task.id === action.payload.id);
         if(editedTask){
          editedTask.title = action.payload.title;
          editedTask.completed = action.payload.completed;
         }
        },

        // Function created for deleting tasks.
        taskDeleted(state,action: PayloadAction<string>){
                state.tasks = state.tasks.filter(task => task.id !== action.payload) //The filter function creates a new array by filtering all of the tasks which id is not equal to id provided when this function is called.
            }
        },
// extra reducers created for handling different action types used in async thunk i.e. for fetching tasks
    extraReducers: (builder) =>{
        // addCase is a method for writing action types and since fetchtasks is an asynchronous logic, it provides three different action types i.e. pending, fulfilled and rejected. So, following cases are written for each type.
    builder
    // When the fetched data is pending, the status of state is set to loading.
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      // When the fetched data is fulfilled, the status of state is set to succeeded and tasks is set to action.payload i.e. data returned by fetchTasks method when it is called.
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'success';
        state.tasks = action.payload // Update tasks state with fetched data
      })
    //   When the fetched data is rejected, the status is set to failed and it occurs when an error appears while fetching. And the value of error is set to error.message to know what type of error has occured. 
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });     
    }
   
})





// exporting actions by destructuring
export const {taskAdded, taskDeleted, taskToggled, taskEdited} = tasksSlice.actions;


// exporting reducer
export default tasksSlice.reducer;