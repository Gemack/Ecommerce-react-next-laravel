import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./Features.scss";

const Features = () => {
  return (
    <div className="Feature">
      <h3>Total Income</h3>
      <div className="feature-chart">
        <CircularProgressbar
          value={70}
          text={"70%"}
          strokeWidth={3}
          styles={buildStyles({
            pathColor: "lime",
            textColor: "lime",
          })}
        />
      </div>
    </div>
  );
};

export default Features;
