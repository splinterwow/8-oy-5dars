import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filter';
import Products from './components/Products';

const App: React.FC = () => {
  const [products] = useState([
    { id: 1, name: 'Lamp', price: 100, image: 'lamp.jpg' },
    { id: 2, name: 'Poster', price: 50, image: 'poster.jpg' },
    { id: 3, name: 'Chair', price: 200, image: 'chair.jpg' },
    // Qo'shimcha mahsulotlar
  ]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Filters />
        <Products products={products} />
      </div>
    </div>
  );
};

export default App;
