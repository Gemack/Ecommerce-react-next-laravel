import React from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/Product/Product";
import { useRouter } from "next/router";

const Category = ({ cat }) => {
  const route = useRouter();
  const head = route.query.cat;
  return (
    <div>
      <Navbar cat={true} />
      <Product data={cat} head={head} />
    </div>
  );
};

export default Category;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/latest/${params.cat}`);

  return {
    props: {
      cat: res.data,
    },
  };
};
