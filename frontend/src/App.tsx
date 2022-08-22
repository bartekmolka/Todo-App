import { Task } from './components/Task'
import { useTaskContext } from './contexts/TaskContext'
import { Form } from './components/Form'
import { DoneTask } from './components/DoneTask'
import * as styles from './styles/App.module.scss'
import { TaskType } from './types/TaskType'
import axios from 'axios'

export const App = () => {
  const { tasks, doneTasks, setTasks } = useTaskContext()

  const loadAllTasks = async () => {
    await axios.get('http://localhost:3000/').then(res => setTasks(res.data))
  }

  const loadTodayTasks = async () => {
    await axios.get('http://localhost:3000/day').then(res => setTasks(res.data))
  }

  const loadTomorrowTasks = async () => {
    await axios.get('http://localhost:3000/tomorrow').then(res => setTasks(res.data))
  }

  const loadWeekTasks = async () => {
    await axios.get('http://localhost:3000/week').then(res => setTasks(res.data))
  }

  const loadMonthTasks = async () => {
    await axios.get('http://localhost:3000/month').then(res => setTasks(res.data))
  }

  return (
    <div className={styles.wrapper}>
      <h1>List of tasks 📖</h1>
      <main className={styles.main}>
        <Form />
        <div className={styles.filters}>
          <button onClick={() => loadAllTasks()}>All</button>
          <button onClick={() => loadTodayTasks()}>Today</button>
          <button onClick={() => loadTomorrowTasks()}>Tomorrow</button>
          <button onClick={() => loadWeekTasks()}>Week</button>
          <button onClick={() => loadMonthTasks()}>Month</button>
        </div>
        <div className={styles.tasks}>
          {tasks?.map((task: TaskType) => (
            <Task {...task} />
          ))}
        </div>

        <div>
          <h2>Done tasks</h2>
          <div className={styles.tasks}>
            {doneTasks && doneTasks.map((doneTask: TaskType) => (
              <DoneTask {...doneTask} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}