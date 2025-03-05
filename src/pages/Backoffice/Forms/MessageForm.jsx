import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import styles from "./form.module.css"
import { useFetchMessages } from "../../../hooks/useFetchMessages"
import Button3 from "../../../components/Button/Button3"

const MessageForm = ({ isEditMode }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [created, setCreated] = useState("")
    const { refetch } = useOutletContext() 
    const navigate = useNavigate() 
    const { id } = useParams()
    const { createMessage, fetchMessageById, updateMessage } = useFetchMessages()

    useEffect(() => {
        if (isEditMode && id) {
            const loadMessageData = async () => {
                try {
                    const response = await fetchMessageById(id)
    
                    if (response) {
                        setName(response.name) 
                        setEmail(response.email) 
                        setDescription(response.description) 
                        setCreated(response.created) 
                    }
                } catch (error) {
                    console.error("Error fetching message:", error)
                }
            }
    
            loadMessageData()
        }
    }, [isEditMode, id, fetchMessageById])
    

    // HÅNDTERING AF FORMULAR-SUBMIT
    const handleSubmitMessage = async (event) => {
        event.preventDefault()

        const messageData = new FormData()
        messageData.append("name", name)
        messageData.append("email", email)
        messageData.append("description", description)
        messageData.append("created", created)

        try {
            let response
            if (isEditMode && id) {
                messageData.append("id", id)
                response = await updateMessage(messageData)
            } else {
                response = await createMessage(messageData)
            }

            console.log (
                isEditMode ? "Besked er opdateret" : "Besked er oprettet", 
                response
            )

            if (response) {
                await refetch()
                navigate("/backoffice/messages") 
            }
        } catch (error) {
            console.error("Fejl ved håndtering af besked:", error)
        }
    }

    return (
        <form onSubmit={handleSubmitMessage} className={styles.form}>
            <h2>{isEditMode ? "Opdater en besked" : "Tilføj en besked"}</h2>
            <div>
                <label htmlFor='name'>Navn:</label>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input
                    id='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='description'>Beskrivelse:</label>
                <input
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='created'>Oprettet:</label>
                <input
                    id='created'
                    type='text'
                    value={created}
                    onChange={(e) => setCreated(e.target.value)}
                    required
                />
            </div>

            <Button3
                type='type'
                text={isEditMode ? "Opdater en besked" : "Tilføj en besked"}
                background={!isEditMode && "green"}
            />
        </form>
    )
}

export default MessageForm