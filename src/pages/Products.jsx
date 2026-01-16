import { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

function Products() {
  // 1. Create products state
  // 2. Create dummy product data
  // Array to hold multiple products
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [showform, setShowform] = useState();
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
      name: name,
      category: category,
      price: price,
      stock: stock,
    };
    setProducts([...products, product]);
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setShowform(false); // Close dialog
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>

          <Dialog open={showform} onOpenChange={setShowform}>
            <DialogTrigger asChild>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer">
                Add Product
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
                <input
                  value={name}
                  type="text"
                  placeholder="Product Name"
                  className="border p-2 rounded"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  value={category}
                  type="text"
                  placeholder="Category"
                  className="border p-2 rounded"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  value={price}
                  type="number"
                  placeholder="Price"
                  className="border p-2 rounded"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  value={stock}
                  type="number"
                  placeholder="Stock"
                  className="border p-2 rounded"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <button
                className="bg-green-500 text-white px-6 py-2 rounded-lg mt-4"
                onClick={addProduct}
              >
                Save Product
              </button>
            </DialogContent>
          </Dialog>
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
        {/* Add Product Form */}
      </div>
    </Layout>
  );
}

export default Products;
