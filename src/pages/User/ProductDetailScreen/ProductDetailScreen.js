import React from "react";
import ProductImage from "../../../components/ProductDetailComponents/ProductImage";
import ProductInformation from "../../../components/ProductDetailComponents/ProductInformation";
import ProductDetailContent from "../../../components/ProductDetailComponents/ProductDetailContent";
import ProductReview from "../../../components/ProductDetailComponents/ProductReview";
import RecentItem from "../../../components/ProductDetailComponents/RecentItem";
import HeaderComponent from "../../../components/Header/HeaderComponent";
import FooterComponent from "../../../components/Footer/FooterComponent";
import SimilarItem from "../../../components/ProductDetailComponents/SimilarItem";
import "../../../assets/style/ProductDetail.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetailScreen = () => {
    return (
        <div>
            <HeaderComponent/>
            <div className="container">
                <div className="row">
                    <ProductImage></ProductImage>
                    <ProductInformation></ProductInformation>
                    <ProductDetailContent></ProductDetailContent>
                    <ProductReview></ProductReview>
                </div>
                <div className="row">
                    <RecentItem></RecentItem>
                </div>
                <div className="row">
                    <SimilarItem></SimilarItem>
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
}

export default ProductDetailScreen;
