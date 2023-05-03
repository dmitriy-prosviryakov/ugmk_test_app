import { productsService } from "../../services/products.service";
import { cookiesService } from "../../services/cookie.service";
import { mapDataForCharts } from "../../utils/mappers";
import { productOptions } from "../../constants/product.constants";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { ProductsVerticalChart } from "../../components/products-vertical-chart/products-vertical-chart";
import "./App.css";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(
    cookiesService.get("selectedProduct") || "all"
  );
  const [chartData, setChartData] = useState();

  const getProducts = async () => {
    try {
      const data = await productsService.getProducts();

      console.log(data);

      const parsedData = mapDataForCharts(data);
      console.log(parsedData);
      setChartData(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onProductSelect = (value) => {
    console.log(value);
    cookiesService.set("selectedProduct", value);

    setSelectedProduct(value);
  };

  return (
    <div className="app">
      <div className="content">
        <div className="filterWrapper">
          <div>Фильтр по типу продукции</div>
          <Select
            options={productOptions}
            value={selectedProduct}
            onChange={onProductSelect}
          />
        </div>
        <div className="chartWrapper">
          <ProductsVerticalChart
            chartData={chartData}
            selectedFilter={selectedProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
