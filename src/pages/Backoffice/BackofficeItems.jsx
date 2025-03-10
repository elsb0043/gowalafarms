import { Outlet, useNavigate } from "react-router-dom"
import { useAlert } from "../../context/alertContext"
import { useFetchProducts } from "../../hooks/useFetchProducts"
import Button3 from "../../components/Button/Button3"
import { useFetchEmployees } from "../../hooks/useFetchEmployees"

// PRODUCTS
const BackofficeProducts = () => {
  // Henter produkter og nødvendige funktioner fra useFetchProducts hook
  const { products, deleteProduct, refetch } = useFetchProducts()
  // Henter funktioner til at vise fejlsituationer og bekræftelser fra useAlert hook
  const { showError, showConfirmation } = useAlert()
  // Henter navigation fra react-router-dom
  const navigate = useNavigate()

  // Funktion til at navigere til siden for at tilføje et produkt
  const handleAddProduct = () => {
    navigate("/backoffice/products/add")
  }

  // Funktion til at navigere til siden for at redigere et produkt
  const handleEdit = (productId) => {
    navigate(`/backoffice/products/edit/${productId}`)
  }

  // Funktion til at vise en bekræftelsesdialog ved sletning af et produkt
  const handleConfirmation = (productId) => {
    showConfirmation(
      "Du er ved at slette denne produkt", // Bekræftelsestekst
      "Er du sikker?", // Spørgsmål
      () => deleteProduct(productId), // Hvis bekræftet, slet produktet
      () => showError("Sletning annulleret.") // Hvis annulleret, vis fejlbesked
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
                <img src={product.image} alt={product.title}></img>
              </td>
              <td>{product.title}</td>
              <td>{product.price},-</td>
              <td className='buttons'>
                {/* Sletningsknap */}
                <Button3
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(product._id)}
                />
                {/* Redigeringsknap */}
                <Button3
                  buttonText='Redigér'
                  onClick={() => handleEdit(product._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              {/* Tilføj produkt-knap */}
              <Button3
                buttonText='Tilføj produkt'
                background='green'
                onClick={() => handleAddProduct()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* Outlet for at lade underkomponenter få adgang til refetch */}
      <Outlet context={{ refetch }} />
    </article>
  )
}

// EMPLOYEES
const BackofficeEmployees = () => {
  // Henter medarbejdere og nødvendige funktioner fra useFetchEmployees hook
  const { employees, deleteEmployee, refetch } = useFetchEmployees()
  const { showError, showConfirmation } = useAlert()
  const navigate = useNavigate()

  // Funktion til at navigere til siden for at tilføje en medarbejder
  const handleAddEmployee = () => {
    navigate("/backoffice/employees/add")
  }

  // Funktion til at vise en bekræftelsesdialog ved sletning af en medarbejder
  const handleConfirmation = (employeeId) => {
    showConfirmation(
      "Du er ved at slette denne holdmakker", // Bekræftelsestekst
      "Er du sikker?", // Spørgsmål
      () => deleteEmployee(employeeId), // Hvis bekræftet, slet medarbejderen
      () => showError("Sletning annulleret.") // Hvis annulleret, vis fejlbesked
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
                <img src={employee.image} alt={employee.name}></img>
              </td>
              <td>{`${employee.text.slice(0, 10)}...`}</td> {/* Korte beskrivelse af medarbejder */}
              <td className='buttons'>
                {/* Sletningsknap */}
                <Button3
                  buttonText="Slet"
                  background="red"
                  onClick={() => handleConfirmation(employee._id)}
                />
                {/* Redigeringsknap */}
                <Button3
                  buttonText='Redigér'
                  onClick={() => handleEdit(employee._id)}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              {/* Tilføj medarbejder-knap */}
              <Button3
                buttonText='Tilføj en holdmakker'
                background='green'
                onClick={() => handleAddEmployee()}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* Outlet for at lade underkomponenter få adgang til refetch */}
      <Outlet context={{ refetch }} />
    </article>
  )
}

export { BackofficeProducts, BackofficeEmployees }