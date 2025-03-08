import { useState } from "react"
import Button2 from "../../Button/Button2"
import styles from "./form.module.css"

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [response, setResponse] = useState(null)
    const [errors, setErrors] = useState({})
    const [sent, setSent] = useState(false)

    const validate = () => {
        let newErrors = {}
        if (!formData.name.trim()) newErrors.name = "Navn er påkrævet"
        if (!formData.email.includes("@")) newErrors.email = "Ugyldig email"
        if (!formData.message.trim()) newErrors.message = "Besked er påkrævet"
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
            await new Promise((resolve) => setTimeout(resolve, 500))

            const { name } = formData
    
            setResponse(`Hej ${name}! Din besked er blevet sendt.`)
            setSent(true)
        } catch {
            setResponse("Der opstod en fejl. Prøv venligst igen.")
        }    

        const { name, email, message } = formData

        const contactData = {
            name,
            email,
            message,
            date: new Date().toISOString()
        }

        const contactFormular = JSON.parse(localStorage.getItem('contactHistory')) || []

        localStorage.setItem('contactHistory', JSON.stringify([...contactFormular, contactData]))

        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                {sent ? (
                    <h3 className={styles.successMsg}>{response}</h3>
                ) : (
                    <>
                        <h3>Send en besked til os</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                required
                                name="name"
                                type="text"
                                placeholder="Dit navn"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                            <input
                                required
                                name="email"
                                type="email"
                                placeholder="Din email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                            <textarea
                                required
                                name="message"
                                placeholder="Din besked"
                                className={styles.textarea}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

                            <Button2 text="Send besked" type="type" />
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default ContactForm