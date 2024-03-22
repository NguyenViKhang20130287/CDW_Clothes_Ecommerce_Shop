import React, {useState} from "react";
// components
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";
import CheckBoxComponent from "../../components/Checkbox/CheckBoxComponent";
import CategoryComponent from "../../components/Category/CategoryComponent";
// icon
import {FaBars, FaSort, FaFilter} from "react-icons/fa";
// img
import SHIRT_IMG from "../../assets/img/shirt1.webp";
// css
import './CollectionScreen.css'
import RadioBoxComponent from "../../components/RadioBoxComponent/RadioBoxComponent";

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

    return (
        <div className={'collectionScreenContainer'}>
            <HeaderComponent/>
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
                    <CategoryComponent
                        isHome={false}
                        categoryName={'Áo thun'}
                        image={SHIRT_IMG}
                        name={'Áo Thun Teelab Local Brand Unisex Baseball Jersey Shirt TS228'}
                        price={'185.000'}
                        originPrice={'350.000'}/>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}

export default CollectionScreen