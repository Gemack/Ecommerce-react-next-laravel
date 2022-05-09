import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import Chart from "../../Components/Chart/Chart";
import ChartContainer from "../../Components/ChartContainer/ChartContainer";
import Features from "../../Components/Features/Features";
import BarChart from "../../Components/ChartContainer/Bar";
import "./Stat.scss";
import PieChart from "../../Components/ChartContainer/Pie";
const StatPage = () => {
  return (
    <div className="stat-page">
      <Sidebar />
      <div className="stat-page-container">
        <Navbar />
        <div className="income-chart">
          <h3>Income and Revenue Chart</h3>
          <ChartContainer />
        </div>
        <div className="stat-grid">
          <div className="featureChart">
            <Features />
          </div>
          <div className="incomeChart">
            <Chart title=" 1/2 Months (Income)" aspect={2 / 1} />
          </div>
          <div className="catChartBar">
            <h3>Sales by Categories</h3>
            <BarChart />
          </div>
          <div className="catChartPie">
            <h3>Income by Categories</h3>
            <PieChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatPage;
