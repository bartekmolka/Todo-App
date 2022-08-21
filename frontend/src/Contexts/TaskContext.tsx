import React, { useState, useRef, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

import { Task as TaskType } from '../Types/TaskType'

type TaskContextType = {
    tasks: TaskType[],
    setTasks: (tasks: TaskType[]) => void,
    values: {},
    setValues: (values: {}) => void,
    isEditing: boolean,
    setIsEditing: (isEditing: boolean) => void,
    taskRef: any,
    dateRef: any,
    id: number,
    setId: (id: number) => void
}

const TaskContext = React.createContext({} as TaskContextType)

export const useTaskContext = () => useContext(TaskContext) 

type TaskProviderProps = {
    children: React.ReactNode
}

export default function TaskContextProvider({ children }: TaskProviderProps) {
    const [values, setValues] = useState({})
    const [tasks, setTasks] = useLocalStorage('tasks', {})
    const [isEditing, setIsEditing] = useState(false);

    const taskRef = useRef<any>();
    const dateRef = useRef<any>();
    const [id, setId] = useState<number>(0);

    return (
        <TaskContext.Provider value={{tasks,setTasks,values,setValues,isEditing,setIsEditing,taskRef,dateRef,id,setId}}>
            {children}
        </TaskContext.Provider>
    )
}
