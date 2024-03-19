import React from "react";
import './ChatBoxComponent.css'

const CheckBoxComponent = ({id, value, name, title, checked, onChange}) => {
    return (
        <div className={'checkBoxComponentContainer'}>
            <div className={'collectionItem'}>
                <input type={'checkbox'}
                       value={value}
                       name={name}
                       id={id}
                       checked={checked}
                       onChange={(e) => onChange(e)}/>
                <label htmlFor={id}>{title}</label>
            </div>
            {/*}*/}
        </div>
    )
}
export default CheckBoxComponent;