import React from "react";
import { useEffect, useState, useRef } from "react";
import { getFactoryLabel, months, getColor } from "../../constants/product.constants";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

export function ProductsVerticalChart({ chartData, selectedFilter }) {
  const [data, setData] = useState();

  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event));
  }

  useEffect(() => {
    if (chartData) {
      const datasets = [];

      for (const company of Object.keys(chartData)) {
        const dataByYear = Object.values(chartData[company])[0];
        const values = [];

        for (const month of months) {
          let sum = 0;

          switch (selectedFilter) {
            case "all":
              sum = Object.values(dataByYear[month.number]).reduce((a, b) => {
                return a + b;
              }, 0);

              break;
            case "product1":
              sum = dataByYear[month.number].product1;

              break;
            case "product2":
              sum = dataByYear[month.number].product2;

              break;
            case "product3":
              sum = dataByYear[month.number].product3;

              break;
            default:
              sum = 0;
              break;
          }

          values.push(sum / 1000);
        }

        datasets.push({
          label: getFactoryLabel(company),
          data: values,
          backgroundColor: getColor(company),
        });
      }

      const newData = {
        labels: months.map((month) => month.label),
        datasets,
      };

      setData(newData);
    }
  }, [chartData, selectedFilter]);
  return data ? <Bar ref={chartRef} options={options} data={data} onClick={onClick}/> : null;
}
