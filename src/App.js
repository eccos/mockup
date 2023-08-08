import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function ProductRow({ product }) {
  return (
    <tr>
      <td style={{ color: !product.stocked && "red" }}>
        {product.name}
      </td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow({ category }) {
  return <tr><th colSpan="2">{category}</th></tr>;
}

function ProductTable({ products, searchTerm, isStockedChkbx }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((item) => {
    // if searchTerm doesnt match anything, skip
    if (!item.name.toLowerCase().includes(searchTerm.toLowerCase())) return;
    // if chkbox checked, and item not stocked, skip
    if (isStockedChkbx && !item.stocked) return;

    if (item.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={item.category}
          key={item.category}
        />
      );
    }
    rows.push(
      <ProductRow
        product={item}
        key={item.name}
      />
    );

    lastCategory = item.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function Search({ searchTerm, isStockedChkbx,
  onSearchTermChange, onIsStockedChkbxChange }) {
  return (
    <form>
      <input type="text"
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}></input>
      <label>
        <input type='checkbox'
          checked={isStockedChkbx}
          onChange={(e) => onIsStockedChkbxChange(e.target.checked)}></input>
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isStockedChkbx, setIsStockedChkbx] = useState(false);
  return (
    <div className="App">
      <Search
        searchTerm={searchTerm}
        isStockedChkbx={isStockedChkbx}
        onSearchTermChange={setSearchTerm}
        onIsStockedChkbxChange={setIsStockedChkbx}
      />
      <ProductTable
        products={products}
        searchTerm={searchTerm}
        isStockedChkbx={isStockedChkbx}
      />
    </div>
  );
}

const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function App() {
  return <FilterableProductTable products={products} />
}

export default App;
