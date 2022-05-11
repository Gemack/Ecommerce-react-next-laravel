import styles from "./Feature.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const Feature = ({ data }) => {
  console.log(data);
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
                <h2>latest discount hot sales</h2>
                <h3>{h.name}</h3>
                <p>{h.description}</p>
                <button className={styles.button}>
                  <Link href="/"> buy @ 5% discount</Link>
                </button>
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
