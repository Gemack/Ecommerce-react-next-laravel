import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import { ListTable } from "../../Components/Tables/Table";
import "./Transaction.scss";

const TransactionPage = () => {
  return (
    <div className="transaction-page">
      <Sidebar />
      <div className="transaction-page-container">
        <Navbar />
        <div className="top">
          <h3>Recent Transactions</h3>
        </div>
        <div className="list">
          <ListTable />
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
