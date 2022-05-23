import styles from "./Latest.module.css";
import { BsCart4, BsFillCartXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../../Redux/cartSlice";

const Latest = ({ data }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
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
              {cart.products.some((p) => p.id === n.id) ? (
                <span
                  className={styles.icons}
                  onClick={() => dispatch(removeProduct(n))}
                >
                  <BsFillCartXFill size={30} color="red" />
                </span>
              ) : (
                <span
                  className={styles.icons}
                  onClick={() => dispatch(addProduct(n))}
                >
                  <BsCart4 size={30} color="lime" />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Latest;
