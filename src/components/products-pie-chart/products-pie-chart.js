import React from "react";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { getProductLabel } from "../../utils/utils";

ChartJS.register(
  ArcElement, Tooltip, Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
  },
};

export function ProductsPieChart({ chartData }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (chartData) {
      const newData = {
        labels: Object.keys(chartData).map((item) => getProductLabel(item)),
        datasets: [
          {
            data: Object.values(chartData).map((item) => Math.floor(item / 1000)),
            backgroundColor: [
              "green", 'yellow', "cyan", "red", "blue"
            ],
          },
        ],
      };

      setData(newData);
    }
  }, [chartData]);

  return data ? (
    <Pie data={data} options={options}/>
  ) : null;
}
