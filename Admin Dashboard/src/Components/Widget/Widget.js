import React from "react";
import "./Widget.scss";
import { GoPerson } from "react-icons/go";
import { FaShoppingBag, FaMoneyBillWaveAlt } from "react-icons/fa";
import { GiShinyPurse } from "react-icons/gi";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "ADMIN USERS",
        Money: false,
        link: "There are a total of 6 users",
        icon: <GoPerson size={40} color="lime" />,
        amount: 6,
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        Money: false,
        link: "1003 orders had been made",
        icon: <FaShoppingBag size={40} color="lime" />,
        amount: 1003,
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        Money: true,
        link: "N350 million",
        icon: <GiShinyPurse size={40} color="lime" />,
        amount: "350,000,290",
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        Money: true,
        link: "N550 Million",
        icon: <FaMoneyBillWaveAlt size={40} color="lime" />,
        amount: "550,041,101",
      };
      break;
    default:
      break;
  }

  return (
    <div className="Widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter" style={{ fontSize: "2rem" }}>
          {data.Money && "N"}
          {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
