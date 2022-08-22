import axios from 'axios'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import * as styles from './styles/App.module.scss'

import { TaskType } from './Types/TaskType'
import { Task } from './components/Task'
import { useTaskContext } from './Contexts/TaskContext'
import { Form } from './components/Form'
import { DoneTask } from './components/DoneTask'

export const App = () => {
  const {tasks, setTasks, doneTasks, setDoneTasks} = useTaskContext()

  async function handleDelete(e: MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault()
    await axios.delete(`http://localhost:3000/${id}`)
      .then(() => setTasks(tasks.filter((task: { ID: number }) => task.ID !== id)))
      .then(() => setDoneTasks(doneTasks.filter((doneTask: { ID: number }) => doneTask.ID !== id)))

  }

  const handleUnDone = async (e: MouseEvent<HTMLButtonElement>, TASK: TaskType) => {
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
    <div className={styles.wrapper}>
      <h1>List of tasks 📖</h1>
      <main className={styles.main}>
        <Form/>
        <div>
          <h2>Tasks to do</h2>
          <div className={styles.tasks}>
            {tasks?.map((task: TaskType) => (
             <Task {...task}/>
            ))}
          </div>
        </div>

        <div>
          <h2>Done tasks</h2>
          <div className={styles.tasks}>
            {doneTasks && doneTasks.map((doneTask: TaskType) => (
              <DoneTask {...doneTask}/>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
