import { useState } from "react";
import axios from "axios";
import { AiFillFileAdd } from "react-icons/ai";
import Navbar from "../../Components/Navbar/Navbar";
import IMG from "./img Placeholder.jpg";
import Sidebar from "../../Components/SideBar/Sidebar";
import { ProductTable } from "../../Components/Tables/Table";
import "./ProductPage.scss";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ProductPage = () => {
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
  const options = [
    { id: 0, name: "" },
    { id: 1, name: "Bags" },
    { id: 2, name: "WristWatch" },
    { id: 3, name: "Ladies" },
    { id: 4, name: "Men" },
  ];
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", product.category);
    formData.append("name", product.name);
    formData.append("quantity", product.quantity);
    formData.append("amount", product.amount);
    formData.append("description", product.description);
    try {
      await axios.post("/api/product", formData);
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
          <h3>Add Product</h3>
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
                  name="image"
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
                <label>Select Categories</label>
                <select
                  name="category"
                  id="category"
                  value={product.category}
                  onChange={onChange}
                >
                  {options.map((cat) => (
                    <option key={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>Product Quantity</label>
                <input
                  type="number"
                  inputprops={{ min: "0" }}
                  name="quantity"
                  onChange={onChange}
                  value={product.quantity}
                />
              </div>
              <div className="formInput">
                <label>Product Amount</label>
                <input
                  type="number"
                  inputprops={{ min: "0" }}
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
              <button type="submit">send</button>
            </form>
          </div>
        </div>
        <div className="bottom">
          <h3>Product List</h3>
        </div>
        <div className="productList">
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
