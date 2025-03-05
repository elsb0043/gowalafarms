import Button2 from '../../Button/Button2'
import styles from './form.module.css'
import { useState } from "react"

function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState({})

    const validate = () => {
        let newErrors = {}
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.includes("@")) newErrors.email = "Invalid email"
        if (!formData.message.trim()) newErrors.message = "Message is required"
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            setResponse(data.message)
        } catch {
            setResponse("An error occurred. Please try again.")
        }
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                <h3>Send en besked til os</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        type="text"
                        placeholder="Dit navn"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                    <input
                        name="email"
                        type="email"
                        placeholder="Din email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                    <input
                        name="message"
                        type="message"
                        placeholder="Din besked"
                        className={styles.textarea}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

                    <Button2 text="Send besked" type="submit" />
                    {response && <p style={{ color: "green" }}>{response}</p>}
                </form>
            </div>
        </div>
    )
}

export default ContactForm