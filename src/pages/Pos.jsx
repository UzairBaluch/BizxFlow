import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

function POSCheckout() {
  // ==========================================
  // STATE VARIABLES - YOU WRITE LOGIC
  // ==========================================

  // Invoice Details
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceType, setInvoiceType] = useState("Sale");
  const [billTo, setBillTo] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Products & Cart
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // New Item Row (inline add)
  const [newItemName, setNewItemName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newSerialNo, setNewSerialNo] = useState("");

  // Bottom Section
  const [deliveryTerms, setDeliveryTerms] = useState("");
  const [soldBy, setSoldBy] = useState("");
  const [splitPayment, setSplitPayment] = useState(false);
  const [payment1Method, setPayment1Method] = useState("Cash");
  const [payment1Amount, setPayment1Amount] = useState("");
  const [payment1Date, setPayment1Date] = useState("");
  const [payment2Method, setPayment2Method] = useState("Cash");
  const [payment2Amount, setPayment2Amount] = useState("");
  const [payment2Date, setPayment2Date] = useState("");
  const [remarks, setRemarks] = useState("");

  // ==========================================
  // FUNCTIONS - YOU WRITE THE LOGIC!
  // ==========================================

  // ==========================================
  // FUNCTIONS
  // ==========================================

  const addItemToCart = () => {
    // 1. Get values from new item inputs
    // 2. Validate (check if name and quantity are filled)
    // 3. Create new item object with id, name, quantity, discount, serialNo
    // 4. Add to cart array
    // 5. Clear the input fields
    // 6. Update localStorage
  };

  const removeFromCart = (itemId) => {
    // 1. Filter out the item with matching id
    // 2. Update cart state
    // 3. Update localStorage
  };

  const updateCartItem = (itemId, field, value) => {
    // 1. Map through cart
    // 2. Find item with matching id
    // 3. Update the specific field (quantity, discountPercent, etc)
    // 4. Return updated item
    // 5. Update cart state
    // 6. Update localStorage
  };

  const calculateItemAmount = (item) => {
    // 1. Get item price and quantity
    // 2. Calculate subtotal (price * quantity)
    // 3. Calculate discount amount (subtotal * discountPercent / 100)
    // 4. Return final amount (subtotal - discount)
    return 0;
  };

  const calculateTotalQuantity = () => {
    // 1. Loop through cart
    // 2. Sum up all quantities
    // 3. Return total
    return 0;
  };

  const calculateTotalAmount = () => {
    // 1. Loop through cart
    // 2. Calculate amount for each item
    // 3. Sum up all amounts
    // 4. Return total
    return 0;
  };

  const handleSaveInvoice = () => {
    // 1. Validate (check if cart has items, required fields filled)
    // 2. Create invoice object with all data
    // 3. Generate invoice number if empty
    // 4. Save to localStorage
    // 5. Show success message
    // 6. Clear form
  };

  const handleSaveAndPrint = () => {
    // 1. Call handleSaveInvoice first
    // 2. Generate print/PDF version of invoice
    // 3. Trigger print dialog or download
  };

  const clearForm = () => {
    // 1. Reset all state variables to initial values
    // 2. Clear cart
    // 3. Clear all input fields
    // 4. Reset payment options
  };

  return (
    <Layout>
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            {/* Invoice Header */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <h1 className="text-2xl font-bold">New Invoice</h1>
              <div className="text-right">
                <p className="text-sm text-gray-500">A/c Balance</p>
                <p className="text-xl font-bold text-green-600">₹ 0.00</p>
              </div>
            </div>

            {/* Invoice Information - 4 Fields Per Row */}
            <div className="grid grid-cols-4 gap-3 mb-4 pb-4 border-b">
              <div>
                <label className="text-xs font-medium block mb-1">
                  Invoice Type
                </label>
                <select
                  value={invoiceType}
                  onChange={(e) => setInvoiceType(e.target.value)}
                  className="w-full border rounded p-2 text-sm"
                >
                  <option value="Sale">Sale</option>
                  <option value="Purchase">Purchase</option>
                  <option value="Return">Return</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">
                  Invoice No.
                </label>
                <Input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="Auto"
                  className="text-sm h-10"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">Date</label>
                <Input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="text-sm h-10"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">
                  Due Date
                </label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="text-sm h-10"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">
                  Bill To
                </label>
                <Input
                  value={billTo}
                  onChange={(e) => setBillTo(e.target.value)}
                  placeholder="Bill To"
                  className="text-sm h-10"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">
                  Contact No.
                </label>
                <Input
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Contact"
                  className="text-sm h-10"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">
                  Customer
                </label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer"
                  className="text-sm h-10"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">
                  Address
                </label>
                <Input
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Address"
                  className="text-sm h-10"
                />
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-4 pb-4 border-b">
              <table className="w-full">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-2 text-left text-sm font-semibold">#</th>
                    <th className="p-2 text-left text-sm font-semibold">
                      Item Name
                    </th>
                    <th className="p-2 text-left text-sm font-semibold">
                      Quantity
                    </th>
                    <th className="p-2 text-left text-sm font-semibold">
                      Disc %
                    </th>
                    <th className="p-2 text-left text-sm font-semibold">
                      Amount
                    </th>
                    <th className="p-2 text-left text-sm font-semibold">
                      Serial No.
                    </th>
                    <th className="p-2 text-left text-sm font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-2 text-sm">{index + 1}</td>
                      <td className="p-2 text-sm">{item.name}</td>
                      <td className="p-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartItem(item.id, "quantity", e.target.value)
                          }
                          className="w-20 text-sm h-8"
                        />
                      </td>
                      <td className="p-2">
                        <Input
                          type="number"
                          value={item.discountPercent}
                          onChange={(e) =>
                            updateCartItem(
                              item.id,
                              "discountPercent",
                              e.target.value
                            )
                          }
                          className="w-20 text-sm h-8"
                        />
                      </td>
                      <td className="p-2 text-sm font-semibold">
                        OMR {calculateItemAmount(item)}
                      </td>
                      <td className="p-2 text-sm">{item.serialNo || "-"}</td>
                      <td className="p-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id)}
                          className="h-7 px-2 text-xs"
                        >
                          ×
                        </Button>
                      </td>
                    </tr>
                  ))}

                  {/* Add New Item Row */}
                  <tr className="bg-gray-50">
                    <td className="p-2 text-sm font-semibold text-green-600">
                      +
                    </td>
                    <td className="p-2">
                      <Input
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Item name"
                        className="text-sm h-8"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        placeholder="Qty"
                        className="w-20 text-sm h-8"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        value={newDiscount}
                        onChange={(e) => setNewDiscount(e.target.value)}
                        placeholder="0"
                        className="w-20 text-sm h-8"
                      />
                    </td>
                    <td className="p-2"></td>
                    <td className="p-2">
                      <Input
                        value={newSerialNo}
                        onChange={(e) => setNewSerialNo(e.target.value)}
                        placeholder="Serial"
                        className="text-sm h-8"
                      />
                    </td>
                    <td className="p-2">
                      <Button
                        size="sm"
                        onClick={addItemToCart}
                        className="bg-green-500 hover:bg-green-600 h-7 px-3 text-xs"
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom Section - 2 Columns */}
            <div className="grid grid-cols-3 gap-4">
              {/* Left Side - Details */}
              <div className="col-span-2 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium block mb-1">
                      Total Quantity
                    </label>
                    <Input
                      value={calculateTotalQuantity()}
                      readOnly
                      className="bg-gray-50 text-sm h-10"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium block mb-1">
                      Sold By
                    </label>
                    <Input
                      value={soldBy}
                      onChange={(e) => setSoldBy(e.target.value)}
                      placeholder="Seller Name"
                      className="text-sm h-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium block mb-1">
                    Delivery Terms
                  </label>
                  <textarea
                    value={deliveryTerms}
                    onChange={(e) => setDeliveryTerms(e.target.value)}
                    placeholder="Enter delivery terms..."
                    className="w-full border rounded p-2 text-sm h-20"
                  />
                </div>

                {/* Payment Section */}
                <div className="space-y-3 border-t pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="splitPayment"
                      checked={splitPayment}
                      onChange={(e) => setSplitPayment(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <label
                      htmlFor="splitPayment"
                      className="text-sm font-medium"
                    >
                      Split Payment
                    </label>
                  </div>

                  {/* Payment 1 */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Payment 1 Method
                      </label>
                      <select
                        value={payment1Method}
                        onChange={(e) => setPayment1Method(e.target.value)}
                        className="w-full border rounded p-2 text-sm h-10"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank</option>
                        <option value="Phone Transfer">Phone Transfer</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Amount
                      </label>
                      <Input
                        type="number"
                        value={payment1Amount}
                        onChange={(e) => setPayment1Amount(e.target.value)}
                        placeholder="Amount"
                        className="text-sm h-10"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Date
                      </label>
                      <Input
                        type="date"
                        value={payment1Date}
                        onChange={(e) => setPayment1Date(e.target.value)}
                        className="text-sm h-10"
                      />
                    </div>
                  </div>

                  {/* Payment 2 - Only show if split payment is checked */}
                  {splitPayment && (
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-medium block mb-1">
                          Payment 2 Method
                        </label>
                        <select
                          value={payment2Method}
                          onChange={(e) => setPayment2Method(e.target.value)}
                          className="w-full border rounded p-2 text-sm h-10"
                        >
                          <option value="Cash">Cash</option>
                          <option value="Bank">Bank</option>
                          <option value="Phone Transfer">Phone Transfer</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-medium block mb-1">
                          Amount
                        </label>
                        <Input
                          type="number"
                          value={payment2Amount}
                          onChange={(e) => setPayment2Amount(e.target.value)}
                          placeholder="Amount"
                          className="text-sm h-10"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium block mb-1">
                          Date
                        </label>
                        <Input
                          type="date"
                          value={payment2Date}
                          onChange={(e) => setPayment2Date(e.target.value)}
                          className="text-sm h-10"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium block mb-1">
                    Remarks / Private Use
                  </label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Internal notes..."
                    className="w-full border rounded p-2 text-sm h-20"
                  />
                </div>
              </div>

              {/* Right Side - Totals & Actions */}
              <div className="space-y-3">
                <div className="border rounded p-4 space-y-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTAL:</span>
                    <span className="text-blue-600">
                      OMR {calculateTotalAmount()}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 h-12"
                    onClick={handleSaveAndPrint}
                    disabled={cart.length === 0}
                  >
                    Save and Print
                  </Button>

                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 h-12"
                    onClick={handleSaveInvoice}
                    disabled={cart.length === 0}
                  >
                    Save
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full h-10"
                    onClick={clearForm}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

export default POSCheckout;
