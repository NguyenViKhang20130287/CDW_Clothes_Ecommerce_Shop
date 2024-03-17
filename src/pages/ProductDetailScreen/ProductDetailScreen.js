import React from "react";
import ProductImage from "../../components/ProductDetailComponents/ProductImage";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductInformation from "../../components/ProductDetailComponents/ProductInformation";
import ProductDetailContent from "../../components/ProductDetailComponents/ProductDetailContent";
import ProductReview from "../../components/ProductDetailComponents/ProductReview";
import "../../assets/style/ProductDetail.css";
import "../../assets/style/ProductReview.css";
const ProductDetailScreen = () => {
    return (
        <div className="container">
            <div className="row">
                <ProductImage></ProductImage>
                <ProductInformation></ProductInformation>
                <ProductDetailContent></ProductDetailContent>
                <ProductReview></ProductReview>
            </div>
        </div>
    );
}

export default ProductDetailScreen;
