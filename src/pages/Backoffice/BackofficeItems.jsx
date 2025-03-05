import { Outlet, useNavigate } from "react-router-dom"
import { useFetchMessages } from "../../hooks/useFetchMessages"
import { useAlert } from "../../context/alertContext"
import Button from "../../components/Button/Button"
import { useFetchProducts } from "../../hooks/useFetchProducts"
import Button3 from "../../components/Button/Button3"

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

  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Billede</th>
            <th>Titel</th>
            <th>Pris</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className='backofficeItem'>
              <td>
                <img src={product.image}></img>
              </td>
              <td>{product.title}</td>
              <td>{product.price},-</td>
              <td className='buttons'>
                <Button3
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(product._id)}
                />
                <Button3
                  buttonText='Redigér'
                  onClick={() => handleEdit(product._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button3
                buttonText='Tilføj produkt'
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

// MESSAGES
const BackofficeMessages = () => {
  const { messages, toggleReadStatus, deleteMessage, refetch } = useFetchMessages()
  const { showError, showConfirmation } = useAlert()
  const navigate = useNavigate()

  const handleAddMessage = () => {
    navigate("/backoffice/messages/add")
  }

  const handleToggleRead = async (messageId, isRead) => {
    try {
      await toggleReadStatus(messageId, !isRead)
      refetch()
    } catch (error) {
      showError("Fejl ved opdatering af beskedstatus.")
    }
  }

  const handleConfirmation = (messageId) => {
    showConfirmation(
      "Du er ved at slette denne besked",
      "Er du sikker?",
      () => deleteMessage(messageId),
      () => showError("Sletning annulleret.")
    )
  }

  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Email</th>
            <th>Beskrivelse</th>
            <th>Tidspunkt</th>
            <th>Læst</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {messages?.map((message) => (
            <tr key={message._id} className='backofficeItem'>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{`${message.description.slice(0, 10)}...`}</td>
              <td>{message.created}</td>
              <td>
                <input
                  type="checkbox"
                  checked={message.isRead}
                  onChange={() => handleToggleRead(message._id, message.isRead)}
                />
              </td>
              <td className='buttons'>
                <Button3
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(message._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button3
                buttonText='Tilføj besked'
                background='green'
                onClick={() => handleAddMessage()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  )
}

export { BackofficeProducts, BackofficeMessages }