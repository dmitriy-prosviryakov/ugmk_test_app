import { productsService } from "../../services/products.service";
import { cookiesService } from "../../services/cookie.service";
import { getChartData } from "../../utils/utils";
import { productOptions } from "../../constants/product.constants"
import { useEffect, useState } from "react";
import { Select } from "antd";

import "./App.css";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(
    cookiesService.get("selectedProduct") || "all"
  );

  const getProducts = async () => {
    try {
      const data = await productsService.getProducts();

      console.log(data);

      const res = getChartData(data);
      console.log(res);
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
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <div>Фильтр по типу продукции</div>
        <Select options={productOptions} value={selectedProduct} onChange={onProductSelect} />
      </div>
    </div>
  );
}

export default App;
