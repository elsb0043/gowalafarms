import { useEffect } from 'react'
import { useFetchArticles } from '../../../hooks/useFetchArticles'
import { icons } from '../../../services/Icons'
import styles from './about.module.css'

function AboutGowala() {
    // Henter artiklerne og fetcher artikel ved ID fra custom hook
    const { articles, fetchArticleById } = useFetchArticles()

    // Brug af useEffect til at hente den sidste artikel, når 'articles' ændres
    useEffect(() => {
        // Tjekker om der er artikler og om listen ikke er tom
        if (articles && articles.length > 0) {
            // Henter ID'en på den sidste artikel fra arrayet
            const lastArticleId = articles[articles.length - 1]._id
            // Fetcher den sidste artikel ved dens ID
            fetchArticleById(lastArticleId)
        }
    }, [articles, fetchArticleById]) // useEffect kører hver gang 'articles' ændres

    // Definerer sidste artikel
    const lastArticle = articles[articles.length - 1]

    return (
        <div className={styles.aboutContainer}>
            <div className={styles.aboutContent}>
                {/* Render den sidste artikel hvis den eksisterer */}
                <div key={lastArticle?._id} className={styles.aboutContentAPI}>
                    <img src={lastArticle?.image} alt={lastArticle?.title} />
                    <div className={styles.aboutContentAPIText}>
                        <h3>{lastArticle?.title}</h3>
                        <p>{lastArticle?.description}</p>
                        {/* Render listen af punkter i den sidste artikel */}
                        <div className={styles.aboutList}>
                            {lastArticle?.list.map((item, index) => (
                                <div key={index} className={styles.aboutListContent}>
                                    <div className={styles.aboutListCheck}>{icons['Check']}</div>
                                    <div className={styles.aboutListItem}>{item}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutGowala