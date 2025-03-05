import { useAuthContext } from '../../../context/useAuthContext'
import Button from '../../Button/Button'
import styles from './login.module.css'

function Login() {
    const {setEmail, setPassword, error, signIn} = useAuthContext()

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContent}>
                <form className={styles.loginForm} onSubmit={signIn}>
                    {error && <p className={styles.failedLogin}>{error}</p>}
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder='Email' 
                    />
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Password' 
                    />
                    <Button text="Log Ind" type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Login