export const getFactoryLiteral = (id) => {
  switch (id) {
    case "1":
      return "А";
    case "2":
      return "Б";
    default:
      return "Х";
  }
};

export const getFactoryLabel = (id) => {
  switch (id) {
    case "1":
      return "Фабрика А";
    case "2":
      return "Фабрика Б";
    default:
      return "Фабрика Х";
  }
};

export const getBarColor = (id) => {
  switch (id) {
    case "1":
      return "red";
    case "2":
      return "blue";
    default:
      return "green";
  }
};

export const getProductLabel = (product) => {
  const productNumber = product.replace(/^\D+/g, '');
  
  return `Продукт ${productNumber}`;
};
