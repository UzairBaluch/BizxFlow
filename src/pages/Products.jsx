import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

function Products() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [showform, setShowform] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // Load products from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // Populate form when editing
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price.toString());
      setStock(editingProduct.stock.toString());
    }
  }, [editingProduct]);

  const addProduct = () => {
    let product = {
      id: Date.now(),
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price),
      stock: parseInt(stock),
    };
    const updatedProducts = [...products, product];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    clearForm();
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((product) => product.id !== id);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    }
  };

  const clearForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setEditingProduct(null);
    setShowform(false);
  };

  const handleSave = () => {
    // Validation
    if (!name.trim() || !category.trim() || !price || !stock) {
      alert("Please fill all fields");
      return;
    }

    if (parseFloat(price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    if (parseInt(stock) < 0) {
      alert("Stock cannot be negative");
      return;
    }

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map((product) => {
        if (product.id === editingProduct.id) {
          return {
            ...product,
            name: name.trim(),
            category: category.trim(),
            price: parseFloat(price),
            stock: parseInt(stock),
          };
        }
        return product;
      });
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      clearForm();
    } else {
      // Add new product
      addProduct();
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products</h1>

          <Dialog
            open={showform}
            onOpenChange={(open) => {
              setShowform(open);
              if (!open) {
                clearForm();
              }
            }}
          >
            <DialogTrigger asChild>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors">
                Add Product
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
                <input
                  value={name}
                  type="text"
                  placeholder="Product Name"
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  value={category}
                  type="text"
                  placeholder="Category"
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  value={price}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Price"
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  value={stock}
                  type="number"
                  min="0"
                  placeholder="Stock"
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer transition-colors"
                  onClick={() => clearForm()}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer transition-colors"
                  onClick={handleSave}
                >
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead
              className="bg-gray-100 text-white"
              style={{
                backgroundColor: "#1e5aff",
                fontFamily: "PolySans-neutral, sans-serif",
              }}
            >
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No products yet. Click "Add Product" to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{product.name}</td>
                    <td className="p-4">{product.category}</td>
                    <td className="p-4">OMR {product.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`${
                          product.stock === 0
                            ? "text-red-500 font-semibold"
                            : product.stock < 10
                            ? "text-orange-500"
                            : ""
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded cursor-pointer transition-colors"
                        onClick={() => {
                          setEditingProduct(product);
                          setShowform(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded cursor-pointer transition-colors"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
