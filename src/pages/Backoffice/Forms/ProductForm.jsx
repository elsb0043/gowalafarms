import { useEffect, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import styles from "./form.module.css"
import { useFetchProducts } from "../../../hooks/useFetchProducts"
import Button3 from "../../../components/Button/Button3"

const ProductForm = ({ isEditMode }) => {
    // State til at gemme formularens inputværdier
    const [title, setTitle] = useState("")  // Titel på produktet
    const [price, setPrice] = useState("")  // Pris på produktet
    const [image, setImage] = useState(null) // Billede af produktet
    const [selectedFile, setSelectedFile] = useState(null) // Valgt billede fra inputfeltet
    const { refetch } = useOutletContext() // Henter refetch-funktionen fra Outlet Context
    const navigate = useNavigate() // Bruges til at navigere til andre sider
    const { id } = useParams() // Henter produktets ID fra URL'en
    const { createProduct, fetchProductById, updateProduct } = useFetchProducts() // API-funktioner

    // Hent produktdata hvis vi er i redigeringstilstand (isEditMode) og ID er til stede
    useEffect(() => {
        if (isEditMode && id) {
            const loadProductData = async () => {
                try {
                    const response = await fetchProductById(id) // Henter produktet fra API'en

                    if (response) {
                        // Sætter formularens inputfelter til produktdataene
                        setTitle(response.title)
                        setPrice(response.price)
                        setImage(response.image) // Billede på produktet
                    }
                } catch (error) {
                    console.error("Error fetching product:", error) // Håndter fejl ved hentning af data
                }
            }
            loadProductData() // Kald funktionen for at hente data
        }
    }, [isEditMode, id, fetchProductById]) // Afhængighed af isEditMode og id

    // Håndtering af billede (forhåndsvisning)
    const handleImageChange = (event) => {
        const file = event.target.files[0] // Får filen, som blev valgt
        if (file) {
            setSelectedFile(file) // Gemmer den valgte fil i state
            const objUrl = window.URL.createObjectURL(file) // Opretter en URL til forhåndsvisning
            setImage(objUrl) // Opdaterer billedet, så det kan vises i formularen
        }
    }

    // Håndtering af formularens submit
    const handleSubmitProduct = async (event) => {
        event.preventDefault() // Forhindrer default opførsel (siden bliver ikke opdateret)

        // Opretter et FormData-objekt til at sende data (inkl. billede) til API'en
        const productData = new FormData()
        productData.append("title", title) // Tilføjer titel til formdata
        productData.append("price", price) // Tilføjer pris til formdata

        if (selectedFile) {
            productData.append("file", selectedFile) // Tilføjer filen (billede) hvis valgt
        }

        try {
            let response
            if (isEditMode && id) {
                productData.append("id", id) // Hvis vi er i redigeringstilstand, tilføjes ID
                response = await updateProduct(productData) // Opdater produktet
            } else {
                response = await createProduct(productData) // Opret et nyt produkt
            }

            console.log(
                isEditMode ? "Produkt er opdateret" : "Produkt er oprettet",
                response
            )

            if (response) {
                await refetch() // Opdaterer produktlisten efter ændringer
                navigate("/backoffice/products") // Navigerer tilbage til produktoversigten
            }
        } catch (error) {
            console.error("Fejl ved håndtering af produkt:", error) // Håndter eventuelle fejl
        }
    }

    return (
        <form onSubmit={handleSubmitProduct} className={styles.form}>
            {/* Formularoverskrift baseret på om vi er i redigeringstilstand */}
            <h2>{isEditMode ? "Opdater produkt" : "Tilføj produkt"}</h2>

            <div>
                {/* Billedeinput med forhåndsvisning */}
                <div>
                    <label htmlFor='image'>Vælg billede (valgfrit):</label>
                    {image && <img className={styles.previewImage} src={image} />} {/* Forhåndsvisning af billede */}
                    <input id='image' type='file' onChange={handleImageChange} /> {/* Input til billede */}
                </div>

                {/* Input til titel */}
                <label htmlFor='title'>Titel:</label>
                <input
                    id='title'
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Opdaterer titel
                    required
                />
            </div>

            <div>
                {/* Input til pris */}
                <label htmlFor='price'>Pris:</label>
                <input
                    id='price'
                    type='text'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} // Opdaterer pris
                    required
                />
            </div>

            {/* Knap til at submitte formularen */}
            <Button3
                type='submit' // Sørg for at submit-type er korrekt
                buttonText={isEditMode ? "Opdater et produkt" : "Tilføj et produkt"}
                background={!isEditMode && "green"} // Grønt for tilføjelse, ingen baggrund for opdatering
            />
        </form>
    )
}

export default ProductForm