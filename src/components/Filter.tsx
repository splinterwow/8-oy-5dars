import { useState } from 'react';

const Filters: React.FC = () => {
  const [price, setPrice] = useState(1000);
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  return (
    <div className="bg-blue-100 p-6 rounded-md shadow-md grid gap-4 grid-cols-1 md:grid-cols-4">
      <input type="text" placeholder="Search Product" className="border p-2" />
      <select className="border p-2">
        <option value="all">Select Category</option>
        <option value="furniture">Furniture</option>
        <option value="electronics">Electronics</option>
      </select>
      <select className="border p-2">
        <option value="all">Select Company</option>
        <option value="ikea">IKEA</option>
      </select>
      <select className="border p-2">
        <option value="a-z">Sort By</option>
        <option value="z-a">z-a</option>
      </select>
      <div className="flex items-center space-x-2">
        <label>Free Shipping</label>
        <input type="checkbox" />
      </div>
      <div>
        <label>Price: ${price}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={handlePriceChange}
          className="w-full"
        />
        <span className="text-sm">Max: $1000</span>
      </div>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">SEARCH</button>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-md">RESET</button>
      </div>
    </div>
  );
};

export default Filters;
