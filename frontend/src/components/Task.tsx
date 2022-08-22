import { useTaskContext } from '../Contexts/TaskContext'
import axios from 'axios'
import * as styles from '../styles/Task.module.scss'

import { Task as TaskType } from '../Types/TaskType'
import { formatDate } from '../utils/formatDate'

export const Task = (task: TaskType) => {
    const { tasks, setTasks, taskRef, dateRef, setId, isEditing, setIsEditing, doneTasks, setDoneTasks} = useTaskContext()

    async function handleDelete(e: any, id: number) {
        e.preventDefault()
        await axios.delete(`http://localhost:3000/${id}`)
            .then(() => setTasks(tasks.filter((task: { ID: number }) => task.ID !== id)))
            .then(() => setDoneTasks(doneTasks.filter((doneTask: { ID: number }) => doneTask.ID !== id)))
    }

    const handleEdit = (e: any, id: number, name: string, date: string) => {
        e.preventDefault()
        setIsEditing(!isEditing)
        taskRef.current.value = name
        dateRef.current.value = date
        setId(id)
    }

    const handleDone = async (e: any, TASK: TaskType) => {
        e.preventDefault()

        axios.put(`http://localhost:3000/${TASK.ID}`, JSON.stringify({
            "name": TASK.name,
            "date": TASK.date,
            "isDone": true
        }))

        setDoneTasks([...doneTasks, TASK])
        setTasks(tasks.filter((task: { ID: number }) => task.ID !== TASK.ID))
    }
    
    return (
        <div key={task.ID} className={styles.task}>
            <div>{task.name}</div>
            <div> {task.date && formatDate(task.date)}</div>
            <div className={styles.buttons}>
                <button onClick={e => handleDone(e, task)} className={styles.done}>done</button>
                <button onClick={e => handleEdit(e, task.ID, task.name, task.date)} className={styles.edit}>edit</button>
                <button onClick={e => handleDelete(e, task.ID)} className={styles.del}>delete</button>
            </div>
        </div>
    )
}