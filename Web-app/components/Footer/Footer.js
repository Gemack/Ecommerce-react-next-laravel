import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer className={styles.container}>
        <div className={styles.logo}>clean hand</div>
        <div className={styles.social}>
          <h3>Socail Links</h3>
          <ul className={styles.socialLinks}>
            <li>
              <a
                href="http://facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <BsFacebook size={25} color="blue" />{" "}
                </span>
                <span>facebook</span>
              </a>
            </li>
            <li>
              <a
                href="http://instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <BsInstagram size={25} color="pink" /> <span>instagram</span>
              </a>
            </li>
            <li>
              <a
                href="http://twiiter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter size={25} color="skyblue" /> <span>twitter </span>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.cat}>
          <h3>categories</h3>
          <ul className={styles.catLink}>
            <li>
              <Link passHref href="/Men">
                men
              </Link>
            </li>
            <li>
              <Link passHref href="/Ladies">
                ladies
              </Link>
            </li>
            <li>
              <Link passHref href="/Bags">
                bags
              </Link>
            </li>
            <li>
              <Link passHref href="/WristWatch">
                wristwatch
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <p style={{ background: "#222", textAlign: "center", color: "white" }}>
        Clean Hand Enterprise &copy; 2021 All Right Reserved
      </p>
    </>
  );
};

export default Footer;
