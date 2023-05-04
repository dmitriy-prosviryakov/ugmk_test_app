import { productsService } from "../../services/products.service";
import { mapDataForCharts } from "../../utils/mappers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFactoryLiteral } from "../../utils/utils";
import { ProductsPieChart } from "../../components/products-pie-chart/products-pie-chart";
import styles from "./details.module.scss";
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

    return month?.name;
  };

  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className={styles.text}>
          {`Статистика по продукции фабрики ${getFactoryLiteral(
            companyId
          )} за ${getMonthLabel()}`}
        </div>
        <div className={styles.chartWrapper}>
          <div className={styles.chart}>
            <ProductsPieChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
