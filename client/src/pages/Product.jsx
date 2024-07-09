import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/Product.css';

const Product = () => {
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [company, setCompany] = useState("");
    const [price, setPrice] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [sellerEmail, setSellerEmail] = useState("");
    const [category, setCategory] = useState("");
    const getProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
            if (response.data.success) {
                console.log(response.data.product);
                setName(response.data.product.name);
                setDescription(response.data.product.description);
                setCategory(response.data.product.category);
                setCompany(response.data.product.company);
                setPrice(response.data.product.price);
                setRating(response.data.product.rating);
                setSellerEmail(response.data.product.sellerEmail);
                setSellerName(response.data.product.sellerName);
                setImage(response.data.product.image.url);
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        getProduct();
    }, []);
    const [userRating, setUserRating] = useState(5);
    const [review, setReview] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/api/v1/user/review/${id}`, {
                rating: userRating,
                review
            }, {
                headers: {
                    user_id: localStorage.getItem('id'),
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                alert("Thank you for your review");
                setUserRating(5);
                setReview("");
                getProduct();
            }
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const addProductToCart = async () => {
        if (!localStorage.getItem('token')) {
            alert("Please login to buy products");
            navigate('/login');
        } else {
            try {
                const response = await axios.post(`http://localhost:4000/api/v1/user/cart/${id}`, {
                    quantity
                }, {
                    headers: {
                        user_id: localStorage.getItem('id'),
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    alert(response.data.message);
                    getProduct();
                }
            } catch (error) {
                console.log(error);
                alert(error.response.data.message);
            }
        }
    };
    return (
        <div className="container" style={{ height: "140vh" }}>
            <div className='product-container'>
                <div className='product-image'>
                    <img src={image} alt={name} />
                    <div className='buy'>
                        <div className="form-group">
                            <label style={{ fontSize: "20px" }}>Quantity</label>
                            <input type="number" placeholder='Quantity' value={quantity} onChange={event => setQuantity(event.target.value)} style={{ width: "150px", padding: "5px", marginLeft: "0" }} />
                        </div>
                        <button className='btn btn-primary' onClick={addProductToCart} style={{ margin: "10px auto", width: "150px", height: "70px" }}>Buy</button>
                    </div>
                </div>
                <div className='product-details'>
                    <h2 className='product-name'>{name}</h2>
                    <p className='product-description'>{description}</p>
                    <p className='product-category'>Category: {category}</p>
                    <p className='product-company'>Company: {company}</p>
                    <p className='product-price'>Price: ₹{price}.00</p>
                    <p className='product-rating'>Rating: {rating.toFixed(1)} / 5</p>
                    <div className='seller-details'>
                        <h3>Seller Information</h3>
                        <p>Name: {sellerName}</p>
                        <p>Email: {sellerEmail}</p>
                    </div>
                </div>
            </div>
            <div className="forms-container">
                <h3>Leave a Review</h3>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <input type="number" id="rating" placeholder='Rating' className='form-control' value={userRating} onChange={event => setUserRating(event.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="review">Review:</label>
                        <textarea id="review" placeholder='Leave a Review' className='form-control' style={{ resize: "none" }} value={review} onChange={event => setReview(event.target.value)}></textarea>
                    </div>
                    <button type="submit" className='btn btn-primary submit-button'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Product;

