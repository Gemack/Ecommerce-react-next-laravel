import React from "react";
import ChartContainer from "../../Components/ChartContainer/ChartContainer";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import Widget from "../../Components/Widget/Widget";
import Features from "../../Components/Features/Features";
import "./HomePage.scss";
import Chart from "../../Components/Chart/Chart";
import { CustomerTable } from "../../Components/Tables/Table";

const HomePage = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="Widget-container">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <h3>Income and Revenue Chart</h3>
        <div className="analysis">
          <ChartContainer />
        </div>
        <div className="features">
          <div className="feature">
            <Features />
          </div>
          <Chart title=" 1/2 Months (Income)" aspect={2 / 1} />
        </div>
        <h3>Registered Customers</h3>
        <CustomerTable pageSize={8} />
      </div>
    </div>
  );
};

export default HomePage;
