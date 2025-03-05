import { useAuthContext } from '../../../context/useAuthContext'
import Button from '../../Button/Button'

function Logout() {
    const { signOut } = useAuthContext()

    return (
        <Button text="Log Ud" type="type" onClick={signOut} />
    )
}

export default Logout