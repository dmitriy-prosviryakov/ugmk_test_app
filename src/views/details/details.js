import { productsService } from "../../services/products.service";
import { mapDataForCharts } from "../../utils/mappers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsPieChart } from "../../components/products-pie-chart/products-pie-chart";
import "./details.css";

function Details() {
  const { companyId, monthNumber } = useParams();

  const [chartData, setChartData] = useState();

  const getProducts = async () => {
    try {
      const data = await productsService.getProducts();
      const parsedData = mapDataForCharts(data);
      const companyData = parsedData[companyId];
      console.log(companyData);

      if (companyData) {
        const months = Object.values(companyData)[0];
        console.log(months);
        console.log(months[monthNumber]);
        setChartData(months[monthNumber]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="App">
      <div>
        {`Details page. companyId: ${companyId}; monthNumber: ${monthNumber} `}
      </div>
      <div>
        <ProductsPieChart chartData={chartData}/>
      </div>
    </div>
  );
}

export default Details;
