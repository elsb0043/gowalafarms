import styles from './button.module.css'

function Button2({ text }) {

    return (
        <div className={styles.button2}>
            {text}
        </div>
    )
}

export default Button2