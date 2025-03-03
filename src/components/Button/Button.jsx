import styles from './button.module.css'

function Button({ text }) {

    return (
        <div className={styles.button}>
            {text}
        </div>
    )
}

export default Button