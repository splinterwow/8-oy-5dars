const Navbar: React.FC = () => {
    return (
      <nav className="bg-blue-900 p-4 flex justify-between items-center text-white">
        <div className="text-3xl font-bold">C</div>
        <ul className="flex space-x-4">
          <li>Home</li>
          <li>About</li>
          <li>Products</li>
          <li>Cart</li>
        </ul>
        <div className="flex space-x-4">
          <span>Sign in / Guest</span>
          <span>Create Account</span>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  