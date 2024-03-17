import React from "react";

const ProductReview = () => {
    return (
        <div className="col-12 col-lg-8">
            <div id="targetSection">
                <div id="sapo-product-reviews" className="sapo-product-reviews" data-id="34686598">
                    <div>
                        <div id="sapo-product-reviews-noitem">
                            <div>
                                <div className="content">
                                    <p>Hiện tại sản phẩm chưa có đánh giá nào, bạn hãy trở thành người đầu tiên đánh giá
                                        cho sản phẩm này</p>
                                    <div className="product-reviews-summary-actions">
                                        <button type="button" className="btn-new-review"
                                                onClick="BPR.newReview(this); return false;">Gửi đánh giá của bạn
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <style>
                            {`
                            .sapo-product-reviews-summary,
                            #sapo-product-reviews-noitem {
                                background-color: rgba(208, 1, 27, 0.1);
                            }
                            .bpr-summary-average {
                                color: #d0011b;
                            }
                            .sapo-product-reviews-star {
                                color: #d0011b;
                            }
                            .btn-new-review {
                                background-color: #d0011b;
                                border-color: #d0011b;
                            }
                            #sapo-product-reviews .sapo-product-reviews-summary .sapo-product-reviews-filter
                            input:checked ~ .checkmark {
                                color: #d0011b;
                                border-color: #d0011b;
                            }
                            #sapo-product-reviews-frm #fileAttach svg path {
                                fill: #d0011b;
                            }
                            #sapo-product-reviews-frm .bpr-button-submit {
                                background-color: #d0011b;
                                border-color: #d0011b;
                            }
                            .sapo-review-verified,
                            .sapo-review-actions {
                                color: #d0011b;
                            }
                            .icon-verified path {
                                fill: #d0011b;
                            }
                            #sapo-product-reviews .sapo-product-reviews-list .sapo-review-reply-list
                            .sapo-review-reply-item .sapo-review-reply-author .is-admin {
                                background-color: #d0011b;
                                border-color: #d0011b;
                            }
                            .simple-pagination li span.current,
                            .simple-pagination li a.current {
                                color: #d0011b;
                                border-color: #d0011b;
                            }
                            #sapo-product-reviews .sapo-product-reviews-summary .sapo-product-reviews-filter h4,
                            #sapo-product-reviews .sapo-product-reviews-summary .sapo-product-reviews-filter p {
                                background-color: #d0011b;
                                border-color: #d0011b;
                            }
                            #sapo-product-reviews .sapo-product-reviews-summary .sapo-product-reviews-filter h4.active,
                            #sapo-product-reviews .sapo-product-reviews-summary .sapo-product-reviews-filter p.active {
                                color: #d0011b;
                            }
                            #sapo-product-reviews .sapo-product-reviews-list .sapo-review-reply-list .btn-show-prev {
                                background-color: rgba(208, 1, 27, 0.1);
                                color: #d0011b;
                            }
                            .bpr-success-popup .icon-checked svg path {
                                fill: #d0011b;
                            }
                            .sapo-review-reply-form .bpr-form-actions .bpr-reply-button-submit {
                                border-color: #d0011b;
                                background: #d0011b;
                            }
                        `}
                        </style>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default ProductReview;
