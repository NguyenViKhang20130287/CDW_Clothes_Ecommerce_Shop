import React, {useEffect, useState} from "react";
import CheckBoxComponent from "../../../components/Checkbox/CheckBoxComponent";
import RadioBoxComponent from "../../../components/RadioBoxComponent/RadioBoxComponent";
import {FaBars, FaSort, FaFilter} from "react-icons/fa";
import './CollectionScreen.css'
import {useParams} from "react-router-dom";
import APIService from "../../../services/APIService1";
import ProductCardComponent from "../../../components/ProductCard/ProductCardComponent";
import {MdNavigateNext} from "react-icons/md";
import {MdNavigateBefore} from "react-icons/md";

const CollectionScreen = () => {
    const [selectOptionSort, setSelectOptionSort] = useState('newest')
    const [colorIsChecked, setColorIsChecked] = useState({})
    const optionsSort = [
        {
            id: 'newest',
            value: 'newest',
            checked: selectOptionSort === 'newest',
            onChange: e => setSelectOptionSort(e.target.value),
            title: 'Mới nhất'
        },
        {
            id: 'ascending',
            value: 'ascending',
            checked: selectOptionSort === 'ascending',
            onChange: e => setSelectOptionSort(e.target.value),
            title: 'Giá tăng dần'
        },
        {
            id: 'descending',
            value: 'descending',
            checked: selectOptionSort === 'descending',
            onChange: e => setSelectOptionSort(e.target.value),
            title: 'Giá giảm dần'
        },
        {
            id: 'nameAtoZ',
            value: 'nameAtoZ',
            checked: selectOptionSort === 'nameAtoZ',
            onChange: e => setSelectOptionSort(e.target.value),
            title: 'A - Z'
        },
        {
            id: 'nameZtoA',
            value: 'nameZtoA',
            checked: selectOptionSort === 'nameZtoA',
            onChange: e => setSelectOptionSort(e.target.value),
            title: 'Z - A'
        }
    ]
    const colors = ['Red', 'Green', 'Blue', 'Yellow']
    const handleCheckboxChange = (event) => {
        const {name, checked} = event.target;
        setColorIsChecked({...colorIsChecked, [name]: checked});
    };
    const {id} = useParams();
    const [products, setProducts] = useState([{}])
    const [categoryName, setCategoryName] = useState('')
    const [page, setPage] = useState(0); // Add this line
    const [totalPages, setTotalPages] = useState(0);
    const fetchProducts = async (category) => {
        try {
            let url = `http://localhost:8080/api/v1/product`;
            if (category !== 'all') {
                url += `/category/${category}`;
            }
            url += `?page=${page}&perPage=16`;
            const response = await new APIService().fetchData(url);
            setProducts(response.content);
            setTotalPages(response.totalPages);
            setCategoryName(response.content[0].category.name)
            console.log(response.content)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchProducts(id === 'all' ? 'all' : id);
    }, [id, page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    }
    const handleNext = () => {
        setPage(page + 1);
    }

    const handlePrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    }
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
                            <CheckBoxComponent
                                id={'all'}
                                value={'all'}
                                title={'Tất cả sản phẩm'}
                                // checked={true}
                            />
                            <CheckBoxComponent
                                id={'shirt'}
                                value={'shirt'}
                                title={'Áo thun'}/>
                            <CheckBoxComponent
                                id={'baby-tee'}
                                value={'baby-tee'}
                                title={'Baby Tee'}/>
                            <CheckBoxComponent
                                id={'polo'}
                                value={'polo'}
                                title={'Áo polo'}/>
                            <CheckBoxComponent
                                id={'so-mi'}
                                value={'so-mi'}
                                title={'Áo sơ mi'}/>
                            <CheckBoxComponent
                                id={'jacket'}
                                value={'jacket'}
                                title={'Áo khoác'}/>
                            <CheckBoxComponent
                                id={'hoodie'}
                                value={'hoodie'}
                                title={'Hoodie'}/>
                            <CheckBoxComponent
                                id={'pants-1'}
                                value={'pants-1'}
                                title={'Quần nam'}/>
                            <CheckBoxComponent
                                id={'pants-2'}
                                value={'pants-2'}
                                title={'Quần nữ'}/>
                            <CheckBoxComponent
                                id={'accessories'}
                                value={'accessories'}
                                title={'Phụ kiện'}/>
                        </div>
                    </div>
                    <div className={'sort'}>
                        <h3 className={'title'}>
                            <FaSort style={{marginRight: '10px'}}/>
                            SẮP XẾP THEO</h3>
                        <div className={'sortWrapper'}>
                            <RadioBoxComponent options={optionsSort} isColor={false}/>
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
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={'productShowWrapper'}>
                    <div className={'categoryContainer'}>
                        <h3 className={'title'}>{categoryName}</h3>
                        <div className={'categoriesWrapper'}>
                            {products && products.length > 0 && products.map((product, index) => {
                                let price = product.price;
                                let originPrice = null;
                                if (product.productPromotions && product.productPromotions.length > 0) {
                                    originPrice = product.price;
                                    price = product.price - product.price * product.productPromotions[0].promotion.discount_rate / 100;
                                }
                                return (
                                    <ProductCardComponent
                                        key={product.id}
                                        image={product.thumbnail}
                                        name={product.name}
                                        price={price}
                                        originPrice={originPrice}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <nav className="woocommerce-pagination">
                        <ul className="pagination pagination__custom justify-content-md-center flex-nowrap flex-md-wrap overflow-auto overflow-md-visble">
                            <li className="flex-shrink-0 flex-md-shrink-1 page-item" title="Previous">
                                <button disabled={page === 0} onClick={handlePrev} className="prev page-link">
                                    <MdNavigateBefore/>
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map(i => (
                                <li key={i}
                                    className={`flex-shrink-0 flex-md-shrink-1 page-item ${page === i ? 'active' : ''}`}>
                                    <button onClick={() => handlePageChange(i)} className="page-link">{i + 1}</button>
                                </li>
                            ))}
                            <li className="flex-shrink-0 flex-md-shrink-1 page-item" title="Next">
                                <button disabled={page === totalPages - 1} onClick={handleNext}
                                        className="next page-link">
                                    <MdNavigateNext/>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default CollectionScreen
