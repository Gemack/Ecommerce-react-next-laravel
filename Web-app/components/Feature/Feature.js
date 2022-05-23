import { useEffect } from "react";
import styles from "./Feature.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../Redux/cartSlice";

const Feature = ({ data }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const PF = "http://127.0.0.1:8000/";
  return (
    <section className={styles.container}>
      <Swiper
        modules={[Navigation]}
        navigation
        speed={1000}
        slidesPerView={1}
        loop
        className={styles.mySwiper}
      >
        {data.map((h) => (
          <SwiperSlide key={h.id}>
            <div className={styles.swiperContainer}>
              <div className={styles.swiperContainerText}>
                <h2>Trending hot sales</h2>
                <br />
                <h3>{h.name}</h3>
                <p>{h.description}</p>
                {cart.products.some((p) => p.id === h.id) ? (
                  <button
                    className={styles.buttonRemove}
                    onClick={() => dispatch(removeProduct(h))}
                  >
                    Remove from cart
                  </button>
                ) : (
                  <button
                    className={styles.button}
                    onClick={() => dispatch(addProduct(h))}
                  >
                    Add to cart
                  </button>
                )}
              </div>
              <div className={styles.img}>
                <img src={PF + h.image} alt={h.name} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Feature;
