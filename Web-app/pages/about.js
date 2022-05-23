import React from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/about.module.css";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.about}>
        <div>
          <h1>about</h1>
          <h2>An Ecommerce Website</h2>
          <p>
            This is an online shopping site for bags wristwatch men and ladies
            wears
          </p>
          <p>All product is affordable at a decent price </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
            eaque eum hic blanditiis est quae.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
            beatae accusantium modi natus, sed dolore?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
