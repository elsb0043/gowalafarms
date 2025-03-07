
import { useFetchArticles } from '../../../hooks/useFetchArticles'
import { icons } from '../../../services/Icons'
import styles from './api.module.css'

function CowAPI() {
    const { articles, error } = useFetchArticles()

    if (error) return <p>Error: {error}</p>
    if (!articles || articles.length === 0) return <p>No articles found.</p>

    return (
        <div className={styles.cow}>
            <div className={styles.cowAPIS}>
                {articles.slice(0, 3).map(ar => 
                    <div key={ar._id} className={styles.cowAPISContent}>
                        <img src={ar.image} />
                        <div className={styles.cowAPISContentText}>
                            <h3>{ar.title}</h3>
                            <p>{ar.description}</p>
                            <div className={styles.cowList}>
                                {ar.list.map((item, index) => (
                                    <div key={index} className={styles.cowListContent}>
                                        <div className={styles.cowListCheck}>{icons['Check']}</div>
                                        <div className={styles.cowListItem}>{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CowAPI