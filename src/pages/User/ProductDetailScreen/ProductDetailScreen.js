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
    const viewed = useSelector(state => state.root.viewed);
    console.log("list", viewed);

    const fetchData = async () => {
        try {
            const result = await new APIService().fetchData(`http://localhost:8080/api/v1/product/${id}`);
            setProduct(result);
            setCategoryId(result.category.id);
            dispatch({type: 'recent/add', payload: result});
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };

    const fetchSimilarProducts = async () => {
        try {
            const result = await apiService.fetchData(`http://localhost:8080/api/v1/product/${id}/related`);
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
                <div className="row">
                    <ProductImage product={product}></ProductImage>
                    <ProductInformation product={product}></ProductInformation>
                    <ProductDetailContent product={product}></ProductDetailContent>
                    <ProductReview></ProductReview>
                </div>
                <div className="row">
                    <RecentItem></RecentItem>
                </div>
                <div className="row">
                    <SimilarItem products={similarProducts}></SimilarItem>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailScreen;
