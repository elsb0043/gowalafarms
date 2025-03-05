import Button from '../../../Button/Button'
import styles from './swiperText.module.css'

function SwiperText() {

    return (
        <div className={styles.swiperText}>
            <h1>Gowala Farms</h1>
            <h3>The Complete Milk</h3>
            <Button text="Read More" />
        </div>
    )
}

export default SwiperText