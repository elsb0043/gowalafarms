import { Outlet, useNavigate } from "react-router-dom"
import { useAlert } from "../../context/alertContext"
import { useFetchProducts } from "../../hooks/useFetchProducts"
import Button3 from "../../components/Button/Button3"
import { useFetchEmployees } from "../../hooks/useFetchEmployees"

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

// EMPLOYEES
const BackofficeEmployees = () => {
  const { employees, deleteEmployee, refetch } = useFetchEmployees()
  const { showError, showConfirmation } = useAlert()
  const navigate = useNavigate()

  const handleAddEmployee = () => {
    navigate("/backoffice/employees/add")
  }

  const handleConfirmation = (employeeId) => {
    showConfirmation(
      "Du er ved at slette denne holdmakker",
      "Er du sikker?",
      () => deleteEmployee(employeeId),
      () => showError("Sletning annulleret."),
    )
  }  

  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Navn</th>
            <th>Billede</th>
            <th>Beskrivelse</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee) => (
            <tr key={employee._id} className='backofficeItem'>
              <td>{employee.name}</td>
              <td>
                <img src={employee.image}></img>
              </td>
              <td>{`${employee.text.slice(0, 10)}...`}</td>
              <td className='buttons'>
                <Button3
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(employee._id)}
                />
                <Button3
                  buttonText='Redigér'
                  onClick={() => handleEdit(employee._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button3
                buttonText='Tilføj en holdmakker'
                background='green'
                onClick={() => handleAddEmployee()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet context={{ refetch }} />
    </article>
  )
}

export { BackofficeProducts, BackofficeEmployees }