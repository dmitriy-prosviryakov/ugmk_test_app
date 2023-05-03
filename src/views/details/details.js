import { productsService } from "../../services/products.service";
import { cookiesService } from "../../services/cookie.service";
import { mapDataForCharts } from "../../utils/utils";
import { productOptions } from "../../constants/product.constants"
import { useEffect, useState } from "react";
import { Select } from "antd";
import { useParams } from 'react-router-dom';
import "./details.css";

function Details() {
  const { companyId, monthNumber } = useParams();

  return (
    <div className="App">
      <div>
        {`Details page. companyId: ${companyId}; monthNumber: ${monthNumber} `}
      </div>
    </div>
  );
}

export default Details;
