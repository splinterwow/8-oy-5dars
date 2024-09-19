interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
  }
  
  const Products: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
      <div className="mt-6">
        <h3>{products.length} products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-md p-4 shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-blue-600">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Products;
  