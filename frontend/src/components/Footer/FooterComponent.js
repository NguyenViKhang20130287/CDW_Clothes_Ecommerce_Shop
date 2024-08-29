import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./FooterComponent.css";
import { IoMdSend } from "react-icons/io";
import logo from "../../assets/img/logo.png";
import certification from "../../assets/img/certification.webp";
import fb from "../../assets/img/fb.png";
import instagram from "../../assets/img/insta.png";
import shopee from "../../assets/img/shopee.png";
import lazada from "../../assets/img/lazada.jpg";
import tiktok from "../../assets/img/tiktok.jpg";
const FooterComponent = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-12 col-contact-footer">
                        <div className="logo-footer">
                            <a href="/public">
                                <img width="135" height="21" className="lazy loaded"
                                     src={logo}
                                         data-src={logo}
                                     alt="Logo" data-was-processed="true"/>
                            </a>
                        </div>
                        <div className="certification">
                            <b className="hkd">HKD Nguyễn Huy Hiệp</b>
                            <br/>
                            Giấy chứng nhận đăng ký HKD số 17A80041952 do Phòng Tài chính - Kế hoạch, Uỷ ban nhân
                            dân thành phố Hồ Chí Minh cấp ngày 30/1/2024 <br/>

                            Địa chỉ: Trường Đại học Nông Lâm TP.HCM, Khu Phố 6, Thủ Đức, Thành phố Hồ Chí Minh, Việt
                            Nam <br/>

                            Email: teelabvnhcm@gmail.com <br/>

                            Điện thoại: 0869687410 <br/>

                        </div>
                        <a className="government" href="http://online.gov.vn/Home/WebDetails/113215">
                            <img src={certification}
                                 alt="bct"/>
                        </a>
                    </div>
                    <div className="col-xl-4 col-lg-3 col-md-7 col-12 footer-mailchip">
                        <h4>Đăng Ký</h4>
                        <form className="mail_footer" action="#" method="post" target="_blank">
                            <input type="email" className="form-control" placeholder="Nhập địa chỉ email" name="email"
                                   id="email"></input>
                            <button className="btn btn-default" type="submit" aria-label="Đăng ký ngay"
                                    name="subscribe">
                                <IoMdSend/>
                            </button>
                        </form>
                        <p>Theo dõi Teelab từ các nền tảng khác nhau nhé!</p>
                        <a href="https://www.facebook.com/teelab.vn" className="social-button facebook"
                           title="Theo dõi trên Facebook">
                            <img src={fb}
                                 alt="facebook"/>
                        </a>
                        <a href="https://www.instagram.com/teelab.vn/" className="social-button instagram"
                           title="Theo dõi trên Instagram">
                            <img src={instagram}
                                 alt="instagram"/>
                        </a>
                        <a href="https://www.tiktok.com/@teelab.studio" className="social-button tiktok"
                           title="Theo dõi trên Tiktok">
                            <img src={tiktok}
                                 alt="tiktok"/>
                        </a>
                        <a href="https://shopee.vn/teelab_official" className="social-button shopee"
                           title="Theo dõi trên Shopee">
                            <img src={shopee}
                                 alt="shopee" width="40"/>
                        </a>
                        <a href="https://www.lazada.vn/shop/teelab" className="social-button lazada"
                           title="Theo dõi trên Lazada">
                            <img src={lazada}
                                 alt="lazada" width="40"/>
                        </a>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-12 footer-click one" style={{marginTop:'10px'}}>
                        <h4>About Us</h4>
                        <ul className="footer-menu toggle-mn">
                            <li><a href="/public" title="Trang chủ" rel="nofollow">Trang chủ</a></li>

                            <li><a href="/tat-ca-san-pham" title="Tất cả sản phẩm" rel="nofollow">Tất cả sản phẩm</a>
                            </li>

                            <li><a href="/bang-size" title="Bảng Size" rel="nofollow">Bảng Size</a></li>

                            <li><a href="/apps/kiem-tra-don-hang" title="Kiểm tra đơn hàng" rel="nofollow">Kiểm tra đơn
                                hàng</a></li>

                            <li><a href="/he-thong-cua-hang" title="Hệ Thống Cửa Hàng" rel="nofollow">Hệ Thống Cửa
                                Hàng</a></li>
                        </ul>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-12 footer-click two">
                        <h4>Chính sách</h4>
                        <ul className="footer-menu toggle-mn">

                            <li><a href="/chinh-sach-mua-hang" title="Chính sách mua hàng" rel="nofollow">Chính sách mua
                                hàng</a></li>

                            <li><a href="/chinh-sach-bao-mat-thong-tin" title="Chính sách bảo mật" rel="nofollow">Chính
                                sách bảo mật</a></li>

                            <li><a href="/phuong-thuc-thanh-toan" title="Phương thức thanh toán" rel="nofollow">Phương
                                thức thanh toán</a></li>

                            <li><a href="/chinh-sach-giao-nhan-van-chuyen-kiem-hang"
                                   title="Chính sách giao nhận, vận chuyển, kiểm hàng" rel="nofollow">Chính sách giao
                                nhận, vận chuyển, kiểm hàng</a></li>

                            <li><a href="/chinh-sach-tra-hang" title="Chính sách đổi trả" rel="nofollow">Chính sách đổi
                                trả</a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default FooterComponent;

