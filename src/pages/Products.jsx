import { useState } from "react";
import Layout from "../components/layout/Layout";

function Products() {
  // 1. Create products state
  // 2. Create dummy product data
  // Array to hold multiple products
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone", category: "Electronics", price: 999, stock: 50 },
    { id: 2, name: "Laptop", category: "Electronics", price: 1500, stock: 30 },
    {
      id: 3,
      name: "MacBook Pro",
      category: "Electronics",
      price: 2000,
      stock: 10,
    },
    { id: 4, name: "Ear Buds", category: "Electronics", price: 500, stock: 50 },
    {
      id: 5,
      name: "USB-C Cable",
      category: "Electronics",
      price: 100,
      stock: 30,
    },

    {
      id: 6,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 150,
      stock: 40,
    },
    { id: 7, name: "Keyboard", category: "Electronics", price: 300, stock: 25 },
    { id: 8, name: "Monitor", category: "Electronics", price: 1200, stock: 15 },
    {
      id: 9,
      name: "Smart Watch",
      category: "Electronics",
      price: 800,
      stock: 20,
    },
    { id: 10, name: "Tablet", category: "Electronics", price: 1100, stock: 18 },

    {
      id: 11,
      name: "Power Bank",
      category: "Electronics",
      price: 250,
      stock: 60,
    },
    {
      id: 12,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 600,
      stock: 35,
    },
    { id: 13, name: "Webcam", category: "Electronics", price: 400, stock: 22 },
    {
      id: 14,
      name: "Headphones",
      category: "Electronics",
      price: 700,
      stock: 28,
    },
  ]);
  const addProduct = () => {
    let product = {
      id: products.length + 1,
      name: "iPhone",
      category: "Electronics",
      price: 999,
      stock: 50,
    };
    setProducts([...products, product]);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">${product.price}</td>
                  <td className="p-4">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
