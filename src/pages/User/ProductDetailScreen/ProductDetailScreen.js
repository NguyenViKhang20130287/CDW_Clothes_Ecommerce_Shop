import React, {useEffect, useState} from "react";
import ProductImage from "../../../components/ProductDetailComponents/ProductImage";
import ProductInformation from "../../../components/ProductDetailComponents/ProductInformation";
import ProductDetailContent from "../../../components/ProductDetailComponents/ProductDetailContent";
import ProductReview from "../../../components/ProductDetailComponents/ProductReview";
import RecentItem from "../../../components/ProductDetailComponents/RecentItem";
import SimilarItem from "../../../components/ProductDetailComponents/SimilarItem";
import "../../../assets/style/ProductDetail.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import APIService from "../../../services/APIService";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const ProductDetailScreen = () => {
    const apiService = new APIService();
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [categoryId, setCategoryId] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const result = await new APIService().fetchData(`/product/${id}`);
            setProduct(result);
            setCategoryId(result.category.id);
            dispatch({type: 'recent/add', payload: result});
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };
    // dispatch({type: 'recent/add', payload: product});
    const fetchSimilarProducts = async () => {
        try {
            const result = await apiService.fetchData(`/product/${id}/related`);
            setSimilarProducts(result);
        } catch (error) {
            console.error('Error fetching similar products', error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchSimilarProducts();
    }, [id])
    return (
        <div className={"product-detail-screen"}>
            <div className="container">
                {product ? <div>
                    <div className="row">
                        <ProductImage product={product}></ProductImage>
                        <ProductInformation product={product}></ProductInformation>
                        <ProductDetailContent product={product}></ProductDetailContent>
                        <ProductReview product={product}></ProductReview>
                    </div>
                    <div className="row">
                        <RecentItem></RecentItem>
                    </div>
                    <div className="row">
                        <SimilarItem products={similarProducts}></SimilarItem>
                    </div>
                </div> : <div className={"empty-product-detail"}>Không có sản phẩm phù hợp</div>
                }
            </div>
        </div>
    );
}

export default ProductDetailScreen;
