import { Link } from 'react-router-dom'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import Button from '../../Button/Button'
import ProductCard from '../../ProductCard/ProductCard'
import styles from './products.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

function OurProducts() {
    // Henter produkterne ved hjælp af useFetchProducts hook
    const { products = [] } = useFetchProducts() // Sørg for, at produkter altid er et array

    // Får kun de første 4 produkter fra listen af produkter
    const displayedProducts = products.slice(0, 4)

    return (
        <div className={styles.products}>
            {/* Sektion til at vise tekst om produkterne */}
            <div className={styles.productsText}>
                <h2>Vores Produkter</h2>
                <h3>Vi har udvalgt de bedste produkter</h3>
                <p>Her finder du et udvalg af friske mejeriprodukter og kvalitetskød fra Gowala Farms – direkte fra gården til dit bord.</p>
            </div>

            {/* Wrapper til produktkort og slider */}
            <div className={styles.productsWrapper}>
                {/* Visning af produktkort til mobilenheder */}
                <div className={styles.productsCards}>
                    {displayedProducts.map((product) => (
                        // For hvert produkt renderes et produktkort
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* Visning af Swiper slider til desktop */}
                <div className={styles.productsSlider}>
                    <div className={styles.sliderProductsCards}>
                        <div className={styles.sliderProductsBorder}>
                            <div className={styles.sliderProductsCard}>
                                {/* En procentdel til visning af tilbud på slideren */}
                                <div className={styles.sliderProcent}>60%</div>

                                {/* Swiper slider komponent */}
                                <Swiper
                                    modules={[Autoplay, Pagination]} // Aktiverer autoplay og pagination
                                    pagination
                                    style={{
                                        "--swiper-pagination-color": "#5E9A13", // Justerer pagination-farven
                                        "--swiper-pagination-bottom": "15rem", // Justerer placeringen af paginationen
                                        "--swiper-pagination-bullet-size": "2rem", // Justerer størrelsen på pagination-bullerne
                                        "--swiper-pagination-bullet-horizontal-gap": "1rem", // Justerer afstanden mellem pagination-bullerne
                                    }}
                                    autoplay={{
                                        delay: 2000, // Angiver hvor hurtigt næste slide vises
                                        disableOnInteraction: false, // Stopper ikke autoplay, når brugeren interagerer
                                    }}
                                    spaceBetween={20} // Sætter afstand mellem slides
                                    slidesPerView={1} // Antal slides der vises på én gang
                                    breakpoints={{
                                        // På skærme med en bredde over 768px, vis kun én slide ad gangen
                                        768: {
                                            slidesPerView: 1,
                                        },
                                    }}
                                    effect="slide" // Sætter effekt til at glide mellem slides
                                    speed={1000} // Hastighed af overgangen
                                    centeredSlides={true} // Centerer slides
                                    loop={true} // Slut ikke karusellen; kør den i en loop
                                >
                                    {/* Her bliver hvert produkt i displayedProducts kortet i swiper */}
                                    {displayedProducts.map((product) => (
                                        <SwiperSlide key={product._id} style={{ height: '100vh' }}>
                                            <img src={product.image} alt={product.title} />
                                            <h3>{product.title}</h3>
                                            <h2>{product.price},-</h2>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Button for at navigere til alle produkter */}
            <Link to="/shop">
                <Button text="Se alle produkter" type="type" />
            </Link>
        </div>
    )
}

export default OurProducts