import { useState } from "react"
import Button2 from "../../Button/Button2"
import styles from "./form.module.css"

const ContactForm = () => {
    // State til at gemme form data (navn, email, besked)
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })

    // State til at gemme svarmeddelelse, f.eks. succes eller fejl
    const [response, setResponse] = useState(null)

    // State til at gemme fejlbeskeder, som opstår ved validering
    const [errors, setErrors] = useState({})

    // State til at holde styr på, om beskeden er sendt
    const [sent, setSent] = useState(false)

    // Funktion til at validere formularen
    const validate = () => {
        let newErrors = {}

        // Tjek om navn er tomt
        if (!formData.name.trim()) newErrors.name = "Navn er påkrævet"

        // Tjek om email er valid
        if (!formData.email.includes("@")) newErrors.email = "Ugyldig email"

        // Tjek om besked er tom
        if (!formData.message.trim()) newErrors.message = "Besked er påkrævet"

        return newErrors
    }

    // Funktion til at håndtere formularens submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validér formularen, og hvis der er fejl, opdater fejlbeskederne
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        // Hvis der ikke er fejl, nulstilles fejlbeskederne
        setErrors({})

        try {
            // Simulerer en API-anmodning ved at bruge setTimeout
            await new Promise((resolve) => setTimeout(resolve, 500))

            const { name } = formData

            // Sætter succesbeskeden, som vises efter indsendelse
            setResponse(`Hej ${name}! Din besked er blevet sendt.`)
            setSent(true)
        } catch {
            // Hvis der opstår en fejl, vises en fejlbesked
            setResponse("Der opstod en fejl. Prøv venligst igen.")
        }

        // Gemmer dataene i localStorage
        const { name, email, message } = formData
        const contactData = {
            name,
            email,
            message,
            date: new Date().toISOString()
        }

        // Henter eksisterende kontaktformularer fra localStorage, eller en tom liste, hvis der ikke er nogen
        const contactFormular = JSON.parse(localStorage.getItem('contactHistory')) || []

        // Gemmer den nye kontaktformular i localStorage
        localStorage.setItem('contactHistory', JSON.stringify([...contactFormular, contactData]))

        // Nulstiller formularens data, så den er klar til en ny indsendelse
        setFormData({ name: "", email: "", message: "" })
    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formContent}>
                {sent ? (
                    // Hvis beskeden er sendt, vis en succesbesked
                    <h3 className={styles.successMsg}>{response}</h3>
                ) : (
                    <>
                        {/* Formens header */}
                        <h3>Send en besked til os</h3>
                        <form onSubmit={handleSubmit}>
                            {/* Input for navn */}
                            <input
                                required
                                name="name"
                                type="text"
                                placeholder="Dit navn"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            {/* Vis fejlbesked, hvis der er en */}
                            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

                            {/* Input for email */}
                            <input
                                required
                                name="email"
                                type="email"
                                placeholder="Din email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            {/* Vis fejlbesked, hvis der er en */}
                            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                            {/* Textarea for besked */}
                            <textarea
                                required
                                name="message"
                                placeholder="Din besked"
                                className={styles.textarea}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                            {/* Vis fejlbesked, hvis der er en */}
                            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

                            {/* Send-knap */}
                            <Button2 text="Send besked" type="type" />
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}

export default ContactForm