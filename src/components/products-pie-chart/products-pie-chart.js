import React from "react";
import { useEffect, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getProductLabel } from "../../utils/utils";
import { pieChartColors } from "../../constants/product.constants";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
    },
    datalabels: {
      anchor: "end",
      align: "end",
      formatter: Math.round,
      color: (chart) => {
        return chart.dataset.backgroundColor[chart.dataIndex];
      },
      font: {
        size: 20,
      },
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
            data: Object.values(chartData).map((item) =>
              Math.floor(item / 1000)
            ),
            backgroundColor: pieChartColors,
          },
        ],
      };

      setData(newData);
    }
  }, [chartData]);

  return data ? <Pie data={data} options={options} /> : null;
}
