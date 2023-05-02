export const getChartData = (data) => {
  const preparedData = mapData(data);

  return mapDataByCompany(preparedData);
};

export const mapDataByCompany = (data) => {
  const companyIds = [...new Set(data.map((item) => item.factory_id))];

  const result = {};

  for (const companyId of companyIds) {
    const filteredData = data.filter((item) => item.factory_id === companyId);

    result[companyId] = mapDataByYear(filteredData);
  }

  return result;
};

export const mapDataByYear = (data) => {
  const years = [...new Set(data.map((item) => item.year))];
  const result = {};
  for (const year of years) {
    result[year] = mapDataByMonth(data, year);
  }

  return result;
};

export const mapDataByMonth = (data, year) => {
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
      product3: dataForMonth.reduce((a, b) => {
        return a + b.product3;
      }, 0),
    };
  }

  return month;
};

export const mapData = (data) => {
  const filtered = data.filter((item) => !!item.date);

  return filtered.map((item) => {
    const date = item.date;

    if (date) {
      const [day, month, year] = date.split("/");

      return {
        ...item,
        month: parseInt(month),
        year: parseInt(year),
      };
    }
    
    return item;
  });
};
