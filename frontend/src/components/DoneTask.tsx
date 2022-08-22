import axios from 'axios'

import { useTaskContext } from '../contexts/TaskContext'
import { TaskType } from '../types/TaskType'

import * as styles from '../styles/Task.module.scss'

export const DoneTask = (doneTask: TaskType) => {
    const { tasks, setTasks, doneTasks, setDoneTasks } = useTaskContext()

    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: number) {
        e.preventDefault()
        await axios.delete(`http://localhost:3000/${id}`)
            .then(() => setTasks(tasks.filter((task: { ID: number }) => task.ID !== id)))
            .then(() => setDoneTasks(doneTasks.filter((doneTask: { ID: number }) => doneTask.ID !== id)))

    }

    const handleUnDone = async (e: React.MouseEvent<HTMLButtonElement>, TASK: TaskType) => {
        e.preventDefault()

        axios.put(`http://localhost:3000/${TASK.ID}`, JSON.stringify({
            "name": TASK.name,
            "date": TASK.date,
            "isDone": false
        }))

        setTasks([...tasks, TASK])
        setDoneTasks(doneTasks.filter((doneTask: { ID: number }) => doneTask.ID !== TASK.ID))
    }

    return (
        <div key={doneTask.ID} className={styles.task}>
            <div>{doneTask.name}</div>
            <div className={styles.buttons}>
                <button onClick={e => handleUnDone(e, doneTask)} className={styles.edit}>Not done</button>
                <button onClick={e => handleDelete(e, doneTask.ID)} className={styles.del}>delete</button>
            </div>
        </div>
    )
}