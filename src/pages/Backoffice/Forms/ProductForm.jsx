import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import styles from "./form.module.css"
import { useFetchProducts } from "../../../hooks/useFetchProducts"
import Button3 from "../../../components/Button/Button3"

const ProductForm = ({ isEditMode }) => {
    // State til at gemme formularens inputværdier
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null) // Gemmer det valgte billede
    const { refetch } = useOutletContext() // Henter refetch-funktionen fra Outlet Context
    const navigate = useNavigate() // Bruges til at navigere til andre sider
    const { id } = useParams() // Henter ID fra URL'en
    const { createProduct, fetchProductById, updateProduct } = useFetchProducts()

    // Hent produkt hvis editMode er true
    useEffect(() => {
        // Kører kun hvis editMode er true og id er defineret
        if (isEditMode && id) {
            // Asynkron funktion, der henter produktets data fra en API
            const loadProductData = async () => {
                try {
                    // Hent data baseret på produktets id
                    const response = await fetchProductById(id)
    
                    // Hvis vi får svar, sætter vi formularens værdier
                    if (response) {
                        setTitle(response.title) // Sætter produktsnavn
                        setPris(response.price) // Sætter pris
                        setImage(response.image) // Sætter billede
                    }
                } catch (error) {
                    // Hvis der opstår en fejl under hentning af data, logges fejlen
                    console.error("Error fetching product:", error)
                }
            }
    
            // Kald funktionen, der henter produktets data
            loadProductData()
        }
    }, [isEditMode, id, fetchProductById])
    

    // FORHÅNDSVISNING AF BILLEDE
    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setSelectedFile(file) // Gemmer det valgte billede i state
            const objUrl = window.URL.createObjectURL(file) // Opretter en URL til forhåndsvisning
            setImage(objUrl) // Opdaterer billedet, så det kan forhåndsvises
        }
    }

    // HÅNDTERING AF FORMULAR-SUBMIT
    const handleSubmitProduct = async (event) => {
        event.preventDefault() // Forhindrer siden i at reloade ved submit

        // Opretter FormData-objekt til at sende data til API'et
        const productData = new FormData()
        productData.append("title", title)
        productData.append("price", price)

        // Tilføjer billedet hvis det er valgt
        if (selectedFile) {
            productData.append("file", selectedFile)
        }

        try {
            let response
            if (isEditMode && id) {
                // Hvis det er redigeringstilstand, opdateres produktet
                productData.append("id", id)
                response = await updateProduct(productData)
            } else {
                // Ellers oprettes et ny produkt
                response = await createProduct(productData)
            }

            console.log (
                isEditMode ? "Produkt er opdateret" : "Produkt er oprettet", 
                response
            )

            if (response) {
                await refetch() // Opdaterer produkterne efter ændringer
                navigate("/backoffice/products") // Navigerer tilbage til produktsoversigten
            }
        } catch (error) {
            console.error("Fejl ved håndtering af produkt:", error)
        }
    }

    return (
        <form onSubmit={handleSubmitProduct} className={styles.form}>
            <h2>{isEditMode ? "Opdater produkt" : "Tilføj produkt"}</h2>
            <div>
                <div>
                    <label htmlFor='image'>Vælg billede (valgfrit):</label>
                    {image && <img className={styles.previewImage} src={image} />}
                    <input id='image' type='file' onChange={handleImageChange} />
                </div>
                {/* Når htmlFor matcher id på input, fokuseres input, når man klikker på label */}
                <label htmlFor='title'>Titel:</label>
                <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='price'>Pris:</label>
                <input
                    id='price'
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>

            <Button3
                type='type'
                buttonText={isEditMode ? "Opdater et produkt" : "Tilføj et produkt"}
                background={!isEditMode && "green"}
            />
        </form>
    )
}

export default ProductForm