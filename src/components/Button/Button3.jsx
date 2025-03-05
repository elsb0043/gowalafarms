import styles from "./button.module.css"

const Button3 = ({buttonText, background, type = "button", onClick}) => {

  return (
    <button
      className={
        background === "red"
          ? styles.redButton
          : background === "green"
          ? styles.greenButton
          : styles.orangeButton
      }
      onClick={onClick}
      type={type}>
        {buttonText}
    </button>
  )
}

export default Button3