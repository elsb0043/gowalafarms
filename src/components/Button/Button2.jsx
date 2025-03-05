import styles from './button.module.css'

function Button2({ text, type = "button", onClick }) {

    return (
        <button className={styles.button2} type={type} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button2