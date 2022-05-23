import styles from "./Category.module.css";
import Link from "next/link";

const Category = () => {
  return (
    <section className={styles.section}>
      <h3>shop by categories</h3>
      <div className={styles.container}>
        <div className={styles.items}>
          <>
            <img src="/Men.jpg" alt="men" className={styles.img} />
            <div className={styles.info}>
              <h3>gentlemen</h3>
              <Link passHref href="/Men">
                <button>Shop Now</button>
              </Link>
            </div>
          </>
        </div>
        <div className={styles.items}>
          <img src="/Ladies.jpg" alt="men" className={styles.img} />
          <div className={styles.info}>
            <h3>ladies</h3>
            <Link passHref href="/Ladies">
              <button>Shop Now</button>
            </Link>
          </div>
        </div>
        <div className={styles.items}>
          <img src="/Bag.jpg" alt="men" className={styles.img} />
          <div className={styles.info}>
            <h3>bags</h3>
            <Link passHref href="/Bags">
              <button>Shop Now</button>
            </Link>
          </div>
        </div>
        <div className={styles.items}>
          <img src="/WristWatch.jpg" alt="men" className={styles.img} />
          <div className={styles.info}>
            <h3>wristwatch</h3>
            <Link passHref href="/WristWatch">
              <button>Shop Now</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
