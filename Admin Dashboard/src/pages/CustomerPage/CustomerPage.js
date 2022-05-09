import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import { CustomerTable } from "../../Components/Tables/Table";
import "./Customer.scss";

const CustomerPage = () => {
  return (
    <div className="product-page">
      <Sidebar />
      <div className="product-page-container">
        <Navbar />
        <div className="top">
          <h3>Registered Customers</h3>
        </div>
        <div className="customer-table">
          <CustomerTable pageSize={11} />
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
