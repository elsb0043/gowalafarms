import { useFetchArticles } from '../../../hooks/useFetchArticles'
import { icons } from '../../../services/Icons'
import styles from './api.module.css'

function CowAPI() {
    // Henter artikler og error fra custom hook
    const { articles, error } = useFetchArticles()

    // Hvis der er en fejl, vises fejlen
    if (error) return <p>Error: {error}</p>

    // Hvis der ikke er nogen artikler, vises en besked
    if (!articles || articles.length === 0) return <p>No articles found.</p>

    return (
        <div className={styles.cow}>
            <div className={styles.cowAPIS}>
                {/* Gennemgår de første 3 artikler */}
                {articles.slice(0, 3).map(ar => 
                    <div key={ar._id} className={styles.cowAPISContent}>
                        {/* Vis artikelbillede */}
                        <img src={ar.image} alt={ar.title} />
                        
                        <div className={styles.cowAPISContentText}>
                            {/* Vis artikelens titel */}
                            <h3>{ar.title}</h3>
                            {/* Vis artikelens beskrivelse */}
                            <p>{ar.description}</p>
                            
                            <div className={styles.cowList}>
                                {/* Vis hver listepunkt i artiklen */}
                                {ar.list.map((item, index) => (
                                    <div key={index} className={styles.cowListContent}>
                                        {/* Vis en check-ikon for hvert punkt */}
                                        <div className={styles.cowListCheck}>{icons['Check']}</div>
                                        {/* Vis selve punktet */}
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