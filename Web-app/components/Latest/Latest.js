import styles from "./Latest.module.css";
import { BsCart4 } from "react-icons/bs";

const Latest = ({ data }) => {
  const PF = "http://127.0.0.1:8000/";
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>
        {" "}
        <span>latest Arrivals</span>
      </h3>
      <div className={styles.boxContainer}>
        {data.map((n) => (
          <div className={styles.box} key={n.id}>
            <div className={styles.image}>
              <img src={PF + n.image} alt="WristWatch.jpg" />
            </div>
            <div className={styles.info}>
              <h3>{n.name}</h3>
              <div className={styles.subInfo}>
                <strong className={styles.price}>
                  {" "}
                  &#8358; {numberWithCommas(n.amount)}
                </strong>
              </div>
            </div>
            <div className={styles.overlay}>
              <span className={styles.icons}>
                <BsCart4 size={30} color="lime" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Latest;
