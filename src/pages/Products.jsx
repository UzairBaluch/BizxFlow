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

  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [showform, setShowform] = useState();
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {

    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
    }
  }, [editingProduct]);
  const addProduct = () => {
    let product = {
      id: Date.now(),
      name: name,
      category: category,
      price: price,
      stock: stock,
    };
    const updatedProducts = [...products, product];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts([...products, product]);
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setShowform(false); 
  };
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleSave = () => {
    if (editingProduct) {
    
      const updatedProducts = products.map((product) => {
        if (product.id === editingProduct.id) {
          return {
            ...product,
            name,
            category,
            price,
            stock,
          };
        }
        return product;
      });
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      setEditingProduct(null);
      setName("");
      setCategory("");
      setPrice("");
      setStock("");
      setShowform(false);
    } else {
      
      addProduct();
    }
  };

  return (
    <Layout>
      <div className="p-">
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
                className="bg-gray-500 text-white px-4 py-1 rounded cursor-pointer"
                onClick={handleSave}
              >
                {editingProduct ? "Update Product" : "Save Product"}
              </button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead
              className="bg-gray-100 text-white"
              style={{
                backgroundColor: "#1e5aff ",
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">OMR {product.price}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      className="bg-gray-500 text-white px-4 py-1 rounded cursor-pointer"
                      onClick={() => {
                        setEditingProduct(product);
                        setShowform(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-1 rounded cursor-pointer "
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </td>
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
