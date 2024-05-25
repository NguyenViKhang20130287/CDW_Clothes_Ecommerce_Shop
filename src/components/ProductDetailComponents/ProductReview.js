import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import "../../assets/style/ProductReview.css";

const ProductReview = () => {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
        setShowForm(false);
    };

    return (
        <div className="col-12 col-lg-8">
            <div id="targetSection">
                <div id="sapo-product-reviews" className="sapo-product-reviews" data-id="34686598">
                    <div>
                        <div id="sapo-product-reviews-noitem">
                            <div>
                                <div className="content">
                                    <p>Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành người đầu tiên đánh giá cho sản phẩm này</p>
                                    <div className="product-reviews-summary-actions">
                                        <button type="button" className="btn-new-review" onClick={handleClick}>
                                            Gửi đánh giá của bạn
                                        </button>
                                    </div>
                                    {showForm && (
                                        <form className="centered-form" onSubmit={handleSubmit}>
                                            <button type="button" className="close-button" onClick={handleClose}>X</button>
                                            <p className="title-form">Đánh giá sản phẩm</p>
                                            <h1 className="product-name">Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228</h1>
                                            <div className="row">
                                                <div className="col-4">Đánh giá:</div>
                                                <div className="col-8 stars">
                                                    <ReactStars
                                                        count={5}
                                                        size={24}
                                                        activeColor="#ffd700"
                                                        onChange={ratingChanged}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <input className="name" type="text" placeholder="Nhập họ tên của bạn" required />
                                            </div>
                                            <div className="row">
                                                <input className="col-12 col-sm-6 email" type="email" placeholder="Nhập email của bạn" required />
                                                <input className="col-12 col-sm-6 phone" type="tel" placeholder="Nhập số điện thoại của bạn" required />
                                            </div>
                                            <div className="row">
                                                <textarea className="content" placeholder="Nhập nội dung đánh giá về sản phẩm này" required></textarea>
                                            </div>
                                            <div className="row">
                                                <input className="file" type="file" placeholder="Đính kèm hình ảnh" />
                                            </div>
                                            <button className="send-review" type="submit">Gửi đánh giá</button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
