import { getFactoryLiteral } from "../utils/utils";

export const ProductsSelectOptionsValues = {
  all: "all",
  product1: "product1",
  product2: "product2",
  //product3: 'product3',
};

export const productOptions = [
  {
    value: ProductsSelectOptionsValues.all,
    label: "Все продукты",
  },
  {
    value: ProductsSelectOptionsValues.product1,
    label: "Продукт 1",
  },
  {
    value: ProductsSelectOptionsValues.product2,
    label: "Продукт 2",
  },
  /*{
    value: ProductsSelectOptionsValues.product3,
    label: "Продукт 3",
  },*/
];

export const months = [
  { label: "Янв", number: 1 },
  { label: "Фев", number: 2 },
  { label: "Мар", number: 3 },
  { label: "Апр", number: 4 },
  { label: "Май", number: 5 },
  { label: "Июн", number: 6 },
  { label: "Июл", number: 7 },
  { label: "Авг", number: 8 },
  { label: "Сен", number: 9 },
  { label: "Окт", number: 10 },
  { label: "Ноя", number: 11 },
  { label: "Дек", number: 12 },
];

export const pieChartColors = ["green", "#FFBD33", "cyan", "red", "blue"];
