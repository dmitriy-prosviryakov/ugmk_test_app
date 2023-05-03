import { productsService } from "../../services/products.service";
import { mapDataForCharts } from "../../utils/mappers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFactoryLiteral } from "../../utils/utils";
import { ProductsPieChart } from "../../components/products-pie-chart/products-pie-chart";
import "./details.css";
import { months } from "../../constants/product.constants";

function Details() {
  const { companyId, monthNumber } = useParams();
  const [chartData, setChartData] = useState();

  const getProducts = async () => {
    try {
      const data = await productsService.getProducts();
      const parsedData = mapDataForCharts(data);
      const companyData = parsedData[companyId];

      if (companyData) {
        const months = Object.values(companyData)[0];
        setChartData(months[monthNumber]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getMonthLabel = () => {
    const month = months.find((item) => item.number.toString() === monthNumber);

    return month?.label;
  };

  return (
    <div className="details">
      <div className="content">
        <div className="text">
          {`Статистика по продукции фабрики ${getFactoryLiteral(
            companyId
          )} за ${getMonthLabel()}`}
        </div>
        <div className="chartWrapper">
          <div className="chart">
            <ProductsPieChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
