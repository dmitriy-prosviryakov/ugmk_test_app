import { productsService } from '../../services/products.service';
import { getChartData } from '../../utils/utils';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
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
    </div>
  );
}

export default App;
