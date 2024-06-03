import React, {useEffect, useState} from "react";
import ProductCardComponent from "../ProductCard/ProductCardComponent";
import APIService from "../../services/APIService";
const SearchComponent = ({keyword}) => {

    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const [searchResult, setSearchResult] = useState([]);

    const handleInputChange = (event) => {
        setSearchKeyword(event.target.value);
    }

    const findProduct = async () => {
        if (searchKeyword.trim() === '') {
            setSearchResult([]);
        } else {
            try {
                const searchResult = await new APIService().fetchData(`/product/search?name=${searchKeyword}`);
                setSearchResult(searchResult);
            } catch (error) {
                console.error('Error fetching product', error);
            }
        }
    }
    useEffect(() => {
        findProduct();
    }, [searchKeyword])
    return (
        <div className={'categoryContainer'}>
            <h3 className={'search-title'}>Tìm kiếm: {searchKeyword}</h3>
            <div className={'searchBar'}>
                <input
                    type={'text'}
                    placeholder={'Tìm kiếm sản phẩm'}
                    value={searchKeyword}
                    onChange={handleInputChange}/>
            </div>
            <div className={'categoriesWrapper'}>
                {searchResult.map((product, index) => {
                    let price = product.price;
                    let originPrice = null;

                    if (product.promotions && product.promotions.length > 0) {
                        originPrice = product.price;
                        price = product.price - product.price * product.promotions[0].discount_rate/100;
                    }
                    return (
                        <ProductCardComponent
                            key={index}
                            image={product.thumbnail}
                            name={product.name}
                            price={price}
                            originPrice={originPrice}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default SearchComponent
