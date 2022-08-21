import axios from 'axios'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import * as styles from './styles/App.module.scss'
import { formatDate } from './utils/formatDate'

import { Task as TaskType } from './Types/TaskType'

export const App = () => {
  const [values, setValues] = useState({})
  const [tasks, setTasks] = useLocalStorage('tasks', {})
  const [isEditing, setIsEditing] = useState(false);

  // const [doneTasks, setDoneTasks] = useLocalStorage('doneTasks', {})

  const taskRef = useRef<any>();
  const dateRef = useRef<any>();
  const [id, setId] = useState<number>(0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await axios.post('http://localhost:3000', JSON.stringify(values))

    await axios.get('http://localhost:3000')
      .then(res => setTasks(res.data))

    console.log(values)
  }

  async function handleDelete(e: MouseEvent<HTMLButtonElement>, id: number) {
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

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.put(`http://localhost:3000/${id}`, JSON.stringify({ 'task': taskRef.current.value, 'date': dateRef.current.value }))

    await axios.get('http://localhost:3000')
      .then(res => setTasks(res.data))

    setIsEditing(!isEditing)
  }

  // const handleDoneTask = async (e: MouseEvent<HTMLButtonElement>, id: number) => {
  //   e.preventDefault()
  //   await axios.put('http://localhost:3000/done', JSON.stringify({ 'id': id }))

  //   setDoneTasks(...doneTasks, tasks.map((task: { ID: number; done: boolean }) => {
  //     if (task.ID === id) {
  //       task.done = true
  //     }
  //     return task
  //   }))
  // setTasks(tasks.filter((task: { ID: number }) => task.ID !== id))

  return (
    <div className={styles.wrapper}>
      <h1>List of tasks 📖</h1>
      <main className={styles.main}>

        <form method='POST'>
          <div>
            <div>
              <input type="text" ref={taskRef} name="task" id="Task" required={true} onChange={e => handleChange(e)} />
              <span >Task </span>
            </div>
            <input type="datetime-local" ref={dateRef} name="date" id="date" required={true} onChange={e => handleChange(e)} />
          </div>
          <div>
            {isEditing ? (
              <button type="submit" onClick={e => handleUpdate(e)}>
                <p>Edit</p>
              </button>) : (
              <button type="submit" onClick={e => handleSubmit(e)}>
                <p>add</p>
              </button>)}
            <button type="reset" onClick={() => setIsEditing(false)}>RESET</button>
          </div>
        </form>

        <div>
          <h2>Tasks to do</h2>
          <div className={styles.tasks}>
            {tasks && tasks.map((task: TaskType, index: number) => (
              <div key={index} className={styles.task}>
                <b>{task.task}</b>
                <b>{formatDate(task.date)}</b>
                <div className={styles.buttons}>
                  {/* <button onClick={e => handleDoneTask(e, task.ID)}>done</button> */}
                  <button onClick={e => handleEdit(e, task.ID, task.task, task.date)}>edit</button>
                  <button onClick={e => handleDelete(e, task.ID)}>delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div>
            <h2>Done</h2>

          </div> */}

      </main>
    </div>
  )
}
