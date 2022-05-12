import Navbar from "../components/Navbar/Navbar";
import Feature from "../components/Feature/Feature";
import Category from "../components/Category/Category";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Latest from "../components/Latest/Latest";

export default function Home({ hot, latest }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <Feature data={hot} />
      <Category />
      <Latest data={latest} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const feature = await axios.get("http://127.0.0.1:8000/api/webhot");
  const latest = await axios.get("http://127.0.0.1:8000/api/latest");

  return {
    props: {
      hot: feature.data,
      latest: latest.data,
    },
  };
};
