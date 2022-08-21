import {useTaskContext} from '../Contexts/TaskContext'
import axios from 'axios'
import * as styles from '../styles/Task.module.scss'

import { Task as TaskType } from '../Types/TaskType'
import { formatDate } from '../utils/formatDate'




export const Task = (index: number, task: TaskType) => {
    const {tasks, setTasks, taskRef, dateRef, setId, isEditing,setIsEditing} = useTaskContext()

    async function handleDelete(e: MouseEvent, id: number) {
        e.preventDefault()
        await axios.delete(`http://localhost:3000/${id}`)
            .then(res => setTasks(tasks.filter((task: { ID: number }) => task.ID !== id)))
    
    }
    
    const handleEdit = (e: MouseEvent, id: number, task: string, date: string) => {
        e.preventDefault()
        setIsEditing(!isEditing)
        taskRef.current.value = task
        dateRef.current.value = date
        setId(id)
    }

    return (
        <div key={index} className={styles.task}>
            <b>{task.task}</b>
            <b>{formatDate(task.date)}</b>
            <div className={styles.buttons}>
                <button>done</button>
                <button onClick={e => handleEdit(e, task.ID, task.task, task.date)}>edit</button>
                <button onClick={e => handleDelete(e, task.ID)}>delete</button>
            </div>
        </div>
    )
}