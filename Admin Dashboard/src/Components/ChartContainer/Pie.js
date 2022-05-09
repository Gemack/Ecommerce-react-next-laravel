import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  return (
    <div>
      {" "}
      <Pie
        height={400}
        width={600}
        data={{
          labels: ["Bags", "WristWatch", "Ladies", "Men"],
          datasets: [
            {
              label: "Sales by Categories",
              data: [5300, 6000, 12000, 10000],
              backgroundColor: ["yellowgreen", "darkgreen", "green", "lime"],
              borderColor: "white",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default PieChart;
