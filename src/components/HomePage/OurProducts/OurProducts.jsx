import { Link } from 'react-router-dom'
import { useFetchProducts } from '../../../hooks/useFetchProducts'
import Button from '../../Button/Button'
import ProductCard from '../../ProductCard/ProductCard'
import styles from './products.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

function OurProducts() {
    const { products = [] } = useFetchProducts() // Sørg for, at produkter altid er et array

    // Få kun de første 4 produkter
    const displayedProducts = products.slice(0, 4)

    return (
        <div className={styles.products}>
            <div className={styles.productsText}>
                <h2>Vores Produkter</h2>
                <h3>Vi har udvalgt de bedste produkter</h3>
                <p>Her finder du et udvalg af friske mejeriprodukter og kvalitetskød fra Gowala Farms – direkte fra gården til dit bord.</p>
            </div>

            <div className={styles.productsWrapper}>
                {/* Product Cards for Mobile View */}
                <div className={styles.productsCards}>
                    {displayedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* Desktop Swiper Slider */}
                <div className={styles.productsSlider}>
                    <Swiper
                        modules={[Pagination]}
                        pagination={{
                            clickable: true, 
                            renderBullet: (index, className) => {
                                return `<span class="${className}"></span>`;
                            }
                        }}
                        style={{
                            "--swiper-pagination-color": "#5E9A13",
                        }}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            768: {
                                slidesPerView: 1,
                            },
                        }}
                    >
                        {displayedProducts.map((product) => (
                            <SwiperSlide key={product._id}>
                                <div className={styles.sliderProductsCards}>
                                    <div key={product._id} className={styles.sliderProductsBorder}>
                                        <div className={styles.sliderProductsCard}>
                                            <div className={styles.sliderProcent}>60%</div>
                                            <img src={product.image} alt={product.title} />
                                            <h3>{product.title}</h3>
                                            <h2>{product.price},-</h2>
                                            {/* Pagination will be here inside the sliderProductsCard */}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <Link to="/shop">
                <Button text="Se alle produkter" type="type" />
            </Link>
        </div>
    )
}

export default OurProducts