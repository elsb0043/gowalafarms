import styles from './header.module.css'

function PageHeader({ title, text }) {

    return (
        <div className={styles.header}>
            <h1>{title}</h1>
            <h3>{text}</h3>
        </div>
    )
}

export default PageHeader