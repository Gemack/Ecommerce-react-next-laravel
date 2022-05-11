import Navbar from "../components/Navbar/Navbar";
import Feature from "../components/Feature/Feature";
import Category from "../components/Category/Category";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home({ hot }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <Feature data={hot} />
      <Category />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://127.0.0.1:8000/api/webhot");
  return {
    props: {
      hot: res.data,
    },
  };
};
