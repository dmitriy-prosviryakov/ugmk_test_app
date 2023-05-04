import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  ProductsSelectOptionsValues,
  months,
} from "../../constants/product.constants";
import { getFactoryLabel, getBarColor} from '../../utils/utils';
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
import { useNavigate } from "react-router-dom";

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

export function ProductsBarChart({ chartData, selectedFilter }) {
  const [data, setData] = useState();
  const chartRef = useRef();
  const navigate = useNavigate();

  const onClick = (event) => {
    const clickedElements = getElementAtEvent(chartRef.current, event);

    if (clickedElements && clickedElements.length) {
      const element = clickedElements[0];

      const companyId = data.datasets[element.datasetIndex]?.id;
      const monthNumber = element.index + 1;
      if (companyId && monthNumber) {
        return navigate(`/details/${companyId}/${monthNumber}`);
      }
    }
  };

  useEffect(() => {
    if (chartData) {
      const datasets = [];

      for (const company of Object.keys(chartData)) {
        const dataByYear = Object.values(chartData[company])[0];
        const values = [];

        for (const month of months) {
          let sum = 0;

          switch (selectedFilter) {
            case ProductsSelectOptionsValues.all:
              sum = Object.values(dataByYear[month.number]).reduce((a, b) => {
                return a + b;
              }, 0);

              break;
            case ProductsSelectOptionsValues.product1:
              sum = dataByYear[month.number].product1;

              break;
            case ProductsSelectOptionsValues.product2:
              sum = dataByYear[month.number].product2;

              break;
            /*case ProductsSelectOptionsValues.product3:
              sum = dataByYear[month.number].product3;

              break;*/
            default:
              sum = 0;
              break;
          }

          values.push(Math.floor(sum / 1000));
        }

        datasets.push({
          id: company,
          label: getFactoryLabel(company),
          data: values,
          backgroundColor: getBarColor(company),
        });
      }

      const newData = {
        labels: months.map((month) => month.label),
        datasets,
      };

      setData(newData);
    }
  }, [chartData, selectedFilter]);
  return data ? (
    <Bar ref={chartRef} options={options} data={data} onClick={onClick} />
  ) : null;
}
