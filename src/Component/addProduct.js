import React, { useState } from "react";

const AddProduct = () => {
    const [name, setProductName] = useState("");
    const [price, setProductPrice] = useState("");
    const [category, setProductCategory] = useState("");
    const [company, setProductCompany] = useState("");
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = "Product Name is required.";
        if (!price) {
            newErrors.price = "Product Price is required.";
        } else if (isNaN(price)) {
            newErrors.price = "Product Price must be a valid number.";
        }
        if (!category) newErrors.category = "Product Category is required.";
        if (!company) newErrors.company = "Product Company is required.";

        return newErrors;
    };

    const handleSave = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const user = JSON.parse(localStorage.getItem('users'));
        if (!user || !user._id) {
            console.error('User ID not found in localStorage');
            return;
        }

        const userId = user._id;
        const response = await fetch('http://localhost:5000/add-product', {
            method: 'POST',
            body: JSON.stringify({
                name,
                price,
                category,
                company,
                userId  
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Product added successfully:', result);
        } else {
            console.error('Error adding product:', result);
        }
    };

    return (
        <div className="add-product-container">
            <h1>Add Product</h1>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Name" 
                    value={name} 
                    onChange={(e) => setProductName(e.target.value)} 
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Price" 
                    value={price} 
                    onChange={(e) => setProductPrice(e.target.value)} 
                />
                {errors.price && <p className="error">{errors.price}</p>}
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Category" 
                    value={category} 
                    onChange={(e) => setProductCategory(e.target.value)} 
                />
                {errors.category && <p className="error">{errors.category}</p>}
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Product Company" 
                    value={company} 
                    onChange={(e) => setProductCompany(e.target.value)} 
                />
                {errors.company && <p className="error">{errors.company}</p>}
            </div>
            <button type="button" onClick={handleSave} className="btn btn-primary">Add Product</button>
        </div>
    );
};

export default AddProduct;
