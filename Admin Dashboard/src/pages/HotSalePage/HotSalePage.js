import React from "react";
import { useState } from "react";
import axios from "axios";
import { AiFillFileAdd } from "react-icons/ai";
import Navbar from "../../Components/Navbar/Navbar";
import IMG from "./img Placeholder.jpg";
import Sidebar from "../../Components/SideBar/Sidebar";
import { HotTable } from "../../Components/Tables/Table";
import "./Hot.scss";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const HotSalePage = () => {
  const [file, setFile] = useState("");

  const [product, setProduct] = useState({
    category: "",
    name: "",
    quantity: "",
    amount: "",
    description: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", product.name);
    formData.append("quantity", product.quantity);
    formData.append("amount", product.amount);
    formData.append("description", product.description);
    try {
      await axios.post("/api/hot", formData);
      Swal.fire("Created", "Product has been added succeessfully", "success");
      window.location.reload();
    } catch {
      toast("Invalid Data input, Product Not Added", {
        position: "top-right",
        autoClose: 4000,
        type: "error",
      });
    }
  };

  return (
    <div className="product-page">
      <Sidebar />
      <div className="product-page-container">
        <Navbar />
        <div className="top">
          <h3>Add Hot Sale Product</h3>
        </div>
        <div className="center">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : IMG} alt={IMG} />
          </div>
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image
                  <AiFillFileAdd
                    style={{ cursor: "pointer", color: "lime" }}
                    size={30}
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={fileChange}
                />
              </div>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={onChange}
                  value={product.name}
                />
              </div>
              <div className="formInput">
                <label>Product Quantity</label>
                <input
                  type="number"
                  inputProps={{ min: "0" }}
                  name="quantity"
                  onChange={onChange}
                  value={product.quantity}
                />
              </div>
              <div className="formInput">
                <label>Product Amount</label>
                <input
                  type="number"
                  inputProps={{ min: "0" }}
                  name="amount"
                  onChange={onChange}
                  value={product.amount}
                />
              </div>
              <div className="formInput">
                <label>Product Description</label>
                <textarea
                  name="description"
                  onChange={onChange}
                  value={product.description}
                ></textarea>
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
        <div className="bottom">
          <h3>Product List</h3>
        </div>
        <div className="productList">
          <HotTable />
        </div>
      </div>
    </div>
  );
};

export default HotSalePage;
