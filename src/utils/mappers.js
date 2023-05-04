export const mapDataForCharts = (data) => {
  const preparedData = prepareData(data);

  return mapDataByCompany(preparedData);
};

const mapDataByCompany = (data) => {
  const companyIds = [...new Set(data.map((item) => item.factory_id))];

  const result = {};

  for (const companyId of companyIds) {
    const filteredData = data.filter((item) => item.factory_id === companyId);

    result[companyId] = mapDataByYear(filteredData);
  }

  return result;
};

const mapDataByYear = (data) => {
  const years = [...new Set(data.map((item) => item.year))];
  const result = {};
  for (const year of years) {
    result[year] = mapDataByMonth(data, year);
  }

  return result;
};

const mapDataByMonth = (data, year) => {
  const dataForYear = data.filter((item) => item.year === year);
  const month = {};

  for (let i = 1; i < 13; i++) {
    const dataForMonth = dataForYear.filter((item) => item.month === i);

    month[i] = {
      product1: dataForMonth.reduce((a, b) => {
        return a + b.product1;
      }, 0),
      product2: dataForMonth.reduce((a, b) => {
        return a + b.product2;
      }, 0),
      /*product3: dataForMonth.reduce((a, b) => {
        return a + b.product3;
      }, 0),*/
    };
  }

  return month;
};

const prepareData = (data) => {
  const filtered = data.filter((item) => !!item.date);

  return filtered.map((item) => {
    const date = item.date;

    if (date) {
      const [, month, year] = date.split("/");

      return {
        ...item,
        month: parseInt(month),
        year: parseInt(year),
      };
    }
    
    return item;
  });
};
