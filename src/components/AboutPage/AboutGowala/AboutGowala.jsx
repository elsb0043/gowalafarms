import { useEffect } from 'react'
import { useFetchArticles } from '../../../hooks/useFetchArticles'
import { icons } from '../../../services/Icons'
import styles from './about.module.css'

function AboutGowala() {
    const { articles, fetchArticleById, isLoading, error } = useFetchArticles()

    // Fetch den sidste artikel ved brug af dens ID
    useEffect(() => {
        if (articles && articles.length > 0) {
            // Fetcher den sidste artikel ved brug af ID
            const lastArticleId = articles[articles.length - 1]._id
            fetchArticleById(lastArticleId)
        }
    }, [articles, fetchArticleById])

    // Handler loading state og errors
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!articles || articles.length === 0) return <p>No articles found.</p>

    // Viser kun den sidste artikel
    const lastArticle = articles[articles.length - 1]

    return (
        <div className={styles.aboutContainer}>
            <div className={styles.aboutContent}>
                <div key={lastArticle._id} className={styles.aboutContentAPI}>
                    <img src={lastArticle.image} alt={lastArticle.title} />
                    <h3>{lastArticle.title}</h3>
                    <p>{lastArticle.description}</p>
                    <div className={styles.aboutList}>
                        {lastArticle.list.map((item, index) => (
                            <div key={index} className={styles.aboutListContent}>
                                <div className={styles.aboutListCheck}>{icons['Check']}</div>
                                <div className={styles.aboutListItem}>{item}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutGowala