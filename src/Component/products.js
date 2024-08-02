import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchKey, setSearchKey] = useState(""); // State to store search input

    useEffect(() => {
        getProducts();
    }, [searchKey]); // Fetch products whenever searchKey changes

    const getProducts = async () => {
        try {
            let url = 'http://localhost:5000/products';
            if (searchKey) {
                url = `http://localhost:5000/search/${encodeURIComponent(searchKey)}`;
            }
            let result = await fetch(url);
            result = await result.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: 'DELETE',
            });
            result = await result.json();

            if (result) {
                getProducts();
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchKey(e.target.value); // Update searchKey state
    };

    return (
        <>
            <h1>Products</h1>
            <div className="search-container" style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Search by name, category, or company" 
                    value={searchKey} 
                    onChange={handleSearchChange}
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '30px',
                        marginLeft: '100px',
                        border: '1px solid #ccc',
                        width: '100%',
                        maxWidth: '400px',
                        boxSizing: 'border-box',
                        float: 'right'
                    }}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>User ID</th>
                        <th>Company</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.userId}</td>
                            <td>{product.company}</td>
                            <td>
                                <button onClick={() => deleteProduct(product._id)}>Delete</button>
                                <Link to={`/update/${product._id}`}>Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Products;
