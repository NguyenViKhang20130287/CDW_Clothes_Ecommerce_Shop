import React, {useState} from "react";
import './RadioBoxComponent.css'

const RadioBoxComponent = ({options}) => {

    return (
        <div className={'radioBoxContainer'}>
            {options.map((item, index) => (
                <div className={'radioBoxItem'} key={index}>
                    <input type={'radio'}
                           id={item.id}
                           value={item.value}
                           checked={item.checked}
                           onChange={item.onChange}/>
                    <label htmlFor={item.id}>{item.title}</label>
                </div>
            ))}
        </div>
    )
}

export default RadioBoxComponent
