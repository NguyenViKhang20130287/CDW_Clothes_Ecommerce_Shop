import React, { useEffect, useState } from "react";
import "../../assets/style/ProductReview.css";
import APIService from "../../services/APIService";
import { Avatar, Rating } from "@mui/material";

const ProductReview = ({ product }) => {
    const [reviews, setReviews] = useState([]);

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    const fetchReview = async () => {
        const apiService = new APIService();
        try {
            const result = await apiService.fetchData(`/review/product/${product.id}`);
            setReviews(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching product reviews', error);
        }
    };

    useEffect(() => {
        fetchReview();
    }, [product.id]);

    return (
        <div className="col-12 col-lg-8">
            <div id="targetSection">
                <div id="sapo-product-reviews" className="sapo-product-reviews" data-id="34686598">
                    {reviews.length === 0 ? (
                        <div id="sapo-product-reviews-noitem">
                            <div>
                                <div className="content">
                                    <p>Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành người đầu tiên đánh giá cho sản phẩm này</p>
                                    <div className="product-reviews-summary-actions">
                                        <button type="button" className="btn-new-review" onClick={handleClick}>
                                            Mua hàng để có thể đánh giá
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div id="sapo-product-reviews-list">
                            {reviews.map((review) => (
                                <div key={review.id} className="review-box">
                                    <div className="review-header">
                                        <Avatar src={review.user.userInformation.avatar} className="review-avatar" />
                                        <div className="review-user-info">
                                            <div className="review-username-rating">
                                                <div className="review-username">{review.user.username}</div>
                                                <Rating value={review.stars} readOnly className="review-rating" />
                                            </div>
                                            <div className="review-details">
                                                Phân loại hàng: {review.orderDetails.color.name}, {review.orderDetails.size.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="review-body">
                                        <div className="review-content">{review.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
