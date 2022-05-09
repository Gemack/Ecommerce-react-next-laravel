import { Bar } from "react-chartjs-2";

const BarChart = () => {
  return (
    <div>
      <Bar
        height={400}
        width={600}
        data={{
          labels: ["Bags", "WristWatch", "Ladies", "Men"],
          datasets: [
            {
              label: "Sales by Categories",
              data: [300, 200, 700, 350],
              backgroundColor: "lime",
              borderColor: "lime",
              borderWidth: 3,
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

export default BarChart;
