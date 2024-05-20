import React from "react";
import './SideBarComponent.css'

const SubMenuComponent = ({menu, onClick, isOpen}) => {
    return (
        <div className={'subMenuWrapper'}>
            <div className={`menuItem ${isOpen ? 'active' : ''}`}
                 onClick={onClick}
            >
                {menu.title}
            </div>
            {/*{isOpen &&*/}
                <div className={`subMenu ${isOpen ? 'open' : ''}`}>
                    {menu.items !== null && menu.items.map((item, itemIndex) => (
                        <button className={'subMenuItem'} key={itemIndex}>{item}</button>
                    ))
                    }
                </div>
            {/*}*/}
        </div>

    )
}

export default SubMenuComponent