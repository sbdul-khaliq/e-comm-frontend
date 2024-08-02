import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateProducts = () => {
    const [name, setProductName] = useState("");
    const [price, setProductPrice] = useState("");
    const [category, setProductCategory] = useState("");
    const [company, setProductCompany] = useState("");
    const [errors, setErrors] = useState({});
    const params = useParams();

    useEffect(() => {
        getProducts();
    }, [params.id])

    const getProducts = async () => {
        const response = await fetch(`http://localhost:5000/updateproduct/${params.id}`);
        if (response.ok) {
            const result = await response.json();
            console.warn(result);
            setProductName(result.name);
            setProductPrice(result.price);
            setProductCategory(result.category);
            setProductCompany(result.company);
        } else {
            console.warn('Failed to fetch product data');
        }
    };

    const handleSave = async () => {
        const updateData = { name, price, category, company };

        const response = await fetch(`http://localhost:5000/updateproduct/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Product updated successfully:', result);
            // Optionally redirect or display a success message
        } else {
            console.warn('Failed to update product');
        }
    };

    return (
        <div className="add-product-container">
            <h1>Update Product</h1>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={(e) => setProductName(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Price" 
                    value={price} 
                    onChange={(e) => setProductPrice(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Category" 
                    value={category} 
                    onChange={(e) => setProductCategory(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Company" 
                    value={company} 
                    onChange={(e) => setProductCompany(e.target.value)} 
                />
            </div>
            <button type="button" onClick={handleSave} className="btn btn-primary">Update Product</button>
        </div>
    );
};

export default UpdateProducts;
