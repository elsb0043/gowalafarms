import styles from './milk.module.css'

function MilkProducer() {
    const milkCards = [
        {
            img: "/assets/cards/01.png",
            title: "Farmens teknologi",
            description: "Vores avancerede teknologi kombinerer effektivitet med høj hygiejnestandard, hvilket garanterer produkter af den bedste kvalitet."
        },
        {
            img: "/assets/cards/02.png",
            title: "Farmens landmænd",
            description: "Landmændene hos Gowala Farms er dedikeret til dyrevelfærd og bæredygtigt landbrug, hvor omsorg for køerne altid kommer i første række."
        },
        {
            img: "/assets/cards/03.png",
            title: "Fra mejeri til forbrugeren",
            description: "Transporten fra mejeriet til butikken foregår hurtigt og skånsomt for at bevare produkternes friskhed og kvalitet."
        }
    ]

    return (
        <div className={styles.milk}>
            <div className={styles.milkText}>
                <h3>Den førende mælkeproducent</h3>
                <h2>Sund og nærende mælk siden 1975</h2>
            </div>
            <div className={styles.milkCards}>
                {milkCards.map((card, index) => (
                    <div key={index} className={styles.milkCard}>
                        <img src={card.img} alt={card.title} />
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MilkProducer