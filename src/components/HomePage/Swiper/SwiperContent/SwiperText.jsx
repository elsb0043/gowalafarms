import { Link } from 'react-router-dom'
import Button from '../../../Button/Button'
import styles from './swiperText.module.css'

function SwiperText() {

    return (
        <div className={styles.swiperText}>
            <h1>Gowala Farms</h1>
            <h3>The Complete Milk</h3>
            <Link to="/about">
                <Button text="Læs Mere" />
            </Link>
        </div>
    )
}

export default SwiperText