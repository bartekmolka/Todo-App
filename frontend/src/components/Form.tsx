import axios from "axios";
import { useRef } from "react";
import { useTaskContext } from "../contexts/TaskContext"
import { clearForm } from "../utils/clearForm";
import * as styles from "../styles/Form.module.scss";

export const Form = () => {
    const { dateRef, taskRef, isEditing, setIsEditing, values, setValues, setTasks, id } = useTaskContext()

    const formRef = useRef<any>();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await axios.put(`http://localhost:3000/${id}`, JSON.stringify({
            "name": taskRef.current.value,
            "date": dateRef.current.value
        }))

        await axios.get('http://localhost:3000')
            .then(res => setTasks(res.data))

        setIsEditing(!isEditing)
        clearForm(formRef)
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        await axios.post('http://localhost:3000', JSON.stringify(values))

        await axios.get('http://localhost:3000')
            .then(res => setTasks(res.data))

        clearForm(formRef)
    }


    return (
        <form method='POST' ref={formRef} className={styles.form}>
            <div>
                <div>
                    <input type="text" ref={taskRef} name="name" required onChange={e => handleChange(e)} />
                    <span >Task </span>
                </div>
                <input type="date" ref={dateRef} name="date" required onChange={e => handleChange(e)} />
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
    )
}