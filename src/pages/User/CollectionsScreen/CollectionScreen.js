import React, {useEffect, useState} from "react";
import CheckBoxComponent from "../../../components/Checkbox/CheckBoxComponent";
import RadioBoxComponent from "../../../components/RadioBoxComponent/RadioBoxComponent";
import {FaBars, FaSort, FaFilter} from "react-icons/fa";
import './CollectionScreen.css';
import {useParams} from "react-router-dom";
import APIService from "../../../services/APIService1";
import ProductCardComponent from "../../../components/ProductCard/ProductCardComponent";
import {MdNavigateNext, MdNavigateBefore} from "react-icons/md";

const CollectionScreen = () => {
    const [selectOptionSort, setSelectOptionSort] = useState('newest');
    const [colorIsChecked, setColorIsChecked] = useState({});
    const {id} = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(id);
    const [selectedColor, setSelectedColor] = useState(null);


    const fetchProducts = async (categoryId ,currentPage, sortOption) => {
        try {
            let url = `http://localhost:8080/api/v1/product`;
            const { sortBy, order } = getSortParams(sortOption);
            if (categoryId !== 'all') {
                url += `/category/${categoryId}`;
            }
            url += `?page=${currentPage}&perPage=16&sort=${sortBy}&order=${order}`;
            console.log(url);
            const response = await new APIService().fetchData(url);
            let allProducts = response.content;
            console.log(allProducts);
            // Apply color filter if selected
            if (selectedColor) {
                allProducts = allProducts.filter(product =>
                    product.colorSizes.some(colorSize => colorSize.color.name === selectedColor)
                );
            }
            // Set filtered products and update pagination
            setProducts(allProducts);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await new APIService().fetchData('http://localhost:8080/api/v1/category?sort=name&order=acs');
            setCategories(response.content);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategory = async (categoryId) => {
        if (categoryId === 'all') {
            setCategory(null);
        } else {
            try {
                const response = await new APIService().fetchData(`http://localhost:8080/api/v1/category/${categoryId}`);
                setCategory(response);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchCategory(selectedCategory);
        fetchProducts(selectedCategory, page, selectOptionSort.split('_')[0], selectOptionSort.split('_')[1]);
    }, [selectedCategory, page, selectOptionSort, selectedColor]);

    useEffect(() => {
        let allProducts = products;
        // Apply color filter if selected
        if (selectedColor) {
            allProducts = allProducts.filter(product =>
                product.colorSizes.some(colorSize => colorSize.color.name === selectedColor)
            );
            setTotalPages(Math.ceil(allProducts.length / 16));
        }
        setProducts(allProducts);
    }, [products, selectedColor]);
    const sortOptions = [
        { value: 'newest', title: 'Mới nhất' },
        { value: 'ascending', title: 'Giá: Thấp đến Cao' },
        { value: 'descending', title: 'Giá: Cao đến Thấp' },
        { value: 'nameAtoZ', title: 'Tên: A đến Z' },
        { value: 'nameZtoA', title: 'Tên: Z đến A' },
    ];
    const getSortParams = (sortOption) => {
        switch (sortOption) {
            case 'newest':
                return { sortBy: 'createdAt', order: 'DESC' };
            case 'ascending':
                return { sortBy: 'price', order: 'ASC' };
            case 'descending':
                return { sortBy: 'price', order: 'DESC' };
            case 'nameAtoZ':
                return { sortBy: 'name', order: 'ASC' };
            case 'nameZtoA':
                return { sortBy: 'name', order: 'DESC' };
            default:
                return { sortBy: 'createdAt', order: 'DESC' };
        }
    };

    const colorMapping = {
        'Trắng': '#fff',
        'Đen': '#000000',
        'Xanh ve chai': '#306249',
        'Ghi': '#808080',
        'Be': '#F5F5DC',
        'Xám khói': '#F5F5F5',
        'Nâu': '#964B00',
        'Xám chì': '#696969',
        'Xanh rêu': '#11452F'
    };
    const colors = Object.keys(colorMapping);

    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setColorIsChecked({...colorIsChecked, [name]: checked});
        setSelectedColor(checked ? name : null); // Set the selected color if the checkbox is checked
    };

    const handleSortChange = (event) => {
        const selectedOption = event.target.value;
        setSelectOptionSort(selectedOption);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    };

    const handleNext = () => {
        setPage(prevPage => prevPage + 1);
        window.scrollTo(0, 0);
    };

    const handlePrev = () => {
        setPage(prevPage => Math.max(prevPage - 1, 0));
        window.scrollTo(0, 0);
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setPage(0); // Reset page to 0 when category changes
    };

    const categoryOptions = [
        {
            id: "all",
            value: "all",
            title: "Tất cả sản phẩm",
            checked: selectedCategory === 'all',
            onChange: () => handleCategoryChange('all')
        },
        ...categories.map(category => ({
            id: category.id,
            value: category.id,
            title: category.name,
            checked: selectedCategory === category.id.toString(),
            onChange: () => handleCategoryChange(category.id.toString())
        }))
    ];


    return (
        <div className={'collectionScreenContainer'}>
            <div className={'collectionScreenWrapper'}>
                <div className={'optionShowWrapper'}>
                    <div className={'collection'}>
                        <h3 className={'title'}>
                            <FaBars style={{marginRight: '10px'}}/>
                            DANH MỤC
                        </h3>
                        <div className={'collectionWrapper'}>
                            <RadioBoxComponent options={categoryOptions} isColor={false}/>
                        </div>
                    </div>
                    <div className={'sort'}>
                        <h3 className={'title'}>
                            <FaSort style={{marginRight: '10px'}}/>
                            SẮP XẾP THEO</h3>
                        <div className={'sortWrapper'}>
                            <RadioBoxComponent
                                options={sortOptions.map(option => ({
                                    ...option,
                                    checked: selectOptionSort === option.value,
                                    onChange: handleSortChange
                                }))}
                                isColor={false}
                            />
                        </div>
                    </div>
                    <div className={'color'}>
                        <h3 className={'title'}>
                            <FaFilter style={{marginRight: '10px'}}/>
                            LỌC SẢN PHẨM</h3>
                        <div className={'colorWrapper'}>
                            {colors.map((color, index) => (
                                <CheckBoxComponent
                                    key={index}
                                    id={color}
                                    value={color}
                                    name={color}
                                    checked={colorIsChecked[color] || false}
                                    title={color}
                                    onChange={e => handleCheckboxChange(e)}
                                    color={colorMapping[color]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={'productShowWrapper'}>
                    <div className={'categoryContainer'}>
                        <h3 className={'title'}>{category ? category.name : 'Tất cả sản phẩm'}</h3>
                        {products && totalPages > 0 ? <div className={'categoriesWrapper'}>
                            {products.map((product, index) => {
                                let price = product.price;
                                let originPrice = null;
                                if (product.promotions && product.promotions.length > 0) {
                                    originPrice = product.price;
                                    price = product.price - product.price * product.promotions[0].discount_rate / 100;
                                }
                                return (
                                    <ProductCardComponent
                                        key={product.id}
                                        id={product.id}
                                        image={product.thumbnail}
                                        name={product.name}
                                        price={price}
                                        originPrice={originPrice}
                                    />
                                );
                            })}
                        </div> : <p>Hiện không có sản phẩm nào</p>}
                    </div>
                    {products && totalPages > 0
                        ? <nav className="woocommerce-pagination">
                            <ul className="pagination pagination__custom justify-content-md-center flex-nowrap flex-md-wrap overflow-auto overflow-md-visble">
                                <li className="flex-shrink-0 flex-md-shrink-1 page-item" title="Previous">
                                    <button disabled={page === 0} onClick={handlePrev} className="prev page-link">
                                        <MdNavigateBefore/>
                                    </button>
                                </li>
                                {[...Array(totalPages).keys()].map(i => (
                                    <li key={i}
                                        className={`flex-shrink-0 flex-md-shrink-1 page-item ${page === i ? 'active' : ''}`}>
                                        <button onClick={() => handlePageChange(i)}
                                                className="page-link">{i + 1}</button>
                                    </li>
                                ))}
                                <li className="flex-shrink-0 flex-md-shrink-1 page-item" title="Next">
                                    <button disabled={page === totalPages - 1} onClick={handleNext}
                                            className="next page-link">
                                        <MdNavigateNext/>
                                    </button>
                                </li>
                            </ul>
                        </nav> : <> </>
                    }
                </div>
            </div>
        </div>
    );
};

export default CollectionScreen;
