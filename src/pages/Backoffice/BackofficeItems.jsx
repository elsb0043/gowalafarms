import { Outlet, useNavigate } from "react-router-dom"
import { useFetchProducts } from "../../hooks/useFetchProducts"
import { useAlert } from "../../context/alertContext"
import Button from "../../components/Button/Button"

// PRODUCTS
const BackofficeProducts = () => {
  const { products, deleteProduct, refetch } = useFetchProducts()
  const { showError, showConfirmation } = useAlert()
  const navigate = useNavigate()

  const handleAddProduct = () => {
    navigate("/backoffice/products/add")
  }

  const handleEdit = (productId) => {
    navigate(`/backoffice/products/edit/${productId}`)
  }

  const handleConfirmation = (productId) => {
    showConfirmation(
      "Du er ved at slette denne produkt",
      "Er du sikker?",
      () => deleteProduct(productId),
      () => showError("Sletning annulleret.")
    )
  }

  console.log(products)
  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Titel</th>
            <th>Beskrivelse</th>
            <th>Ugedage</th>
            <th>Tidspunkt</th>
            <th>Billede</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className='backofficeItem'>
              <td>{product.title}</td>
              <td>{`${product.description.slice(0, 10)}...`}</td>
              <td>{product.date}</td>
              <td>{product.time}</td>
              <td>
                <img src={product.image}></img>
              </td>
              <td className='buttons'>
                <Button
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(product._id)}
                />
                <Button
                  buttonText='Redigér'
                  onClick={() => handleEdit(product._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button
                buttonText='Tilføj produckt'
                background='green'
                onClick={() => handleAddProduct()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  )
}

export { BackofficeProducts }