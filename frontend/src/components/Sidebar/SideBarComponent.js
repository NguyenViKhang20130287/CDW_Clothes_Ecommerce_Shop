import React, {useState} from "react";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar'
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPricetagsOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { LuWarehouse } from "react-icons/lu";
import { MdOutlineDiscount, MdOutlineContactSupport  } from "react-icons/md";

// css
import './SideBarComponent.css'
import SubMenuComponent from "./SubMenuComponent";

const SideBarComponent = () => {

    return (
        <div className={'sidebarAdminContainer'}>
            <div className={'title'}>
                <h3>Hệ thống quản lí</h3>
            </div>
            <Sidebar className={'sidebar'}>
                <Menu className={'menu'}>
                    <MenuItem icon={<AiOutlineDashboard/>}>Bảng điều khiển</MenuItem>
                    <SubMenu icon={<IoPricetagsOutline/>} label={`Quản lí sản phẩm`}>
                        <MenuItem>Danh sách sản phẩm</MenuItem>
                        <MenuItem>Thêm sản phẩm mới</MenuItem>
                    </SubMenu>
                    <SubMenu icon={<RiBillLine/>} label={'Quản lí đơn hàng'}>
                        <MenuItem>Danh sách đơn hàng</MenuItem>
                        <MenuItem>Thêm đơn hàng mới</MenuItem>
                    </SubMenu>
                    <SubMenu icon={<FaRegUser/>} label={'Quản lí khách hàng'}>
                        <MenuItem>Danh sách khách hàng</MenuItem>
                        <MenuItem>Thêm khách hàng mới</MenuItem>
                    </SubMenu>
                    <SubMenu icon={<LuWarehouse/>} label={'Quản lí kho hàng'}>
                        <MenuItem>Nhập hàng</MenuItem>
                        <MenuItem>Lịch sử nhập hàng</MenuItem>
                    </SubMenu>
                    <MenuItem icon={<MdOutlineDiscount/>}>Quản lí Khuyến mãi</MenuItem>
                    <MenuItem icon={<MdOutlineContactSupport/>}>Chăm sóc khách hàng</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SideBarComponent