import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ExchangeScreen.css";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";

const ExchangeScreen = () => {

    return (
        <div className="big">
            <HeaderComponent/>
            <section className="page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <h1 className="title-head">Chính sách Đổi trả</h1>
                            <div className="content-page rte">
                                {/*font-family":"Tahoma,Geneva,sans-serif, 14px*/}
                                <p><span><span
                                    style={{"font-family": "Tahoma,Geneva,sans-serif"}}><strong>1. CHÍNH SÁCH ĐỔI SẢN PHẨM</strong></span></span>
                                </p>
                                <p><span><span><b>a. Đổi size</b></span></span>
                                </p>
                                <p><span><span>– Áp dụng 01 lần đổi /1 đơn hàng với các đơn hàng mua online và các đơn hàng mua tại cửa hàng.</span></span>
                                </p>
                                <p><span><span>– Sản phẩm đổi trong thời gian 3&nbsp;ngày kể từ ngày mua hàng trên hoá đơn (đối với khách mua hàng trực tiếp tại cửa hàng), 3&nbsp;ngày kể từ ngày nhận hàng (Đối với khách mua online)</span></span>
                                </p>
                                <p><span><span>– Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.</span></span>
                                </p>
                                <p><span><span>– Không áp dụng đối với các sản phẩm là phụ kiện</span></span>
                                </p>
                                <p><span><span
                                ><strong>b. Đổi sản phẩm lỗi</strong></span></span>
                                </p>
                                <p><span><span>Điều kiện áp dụng</span></span>
                                </p>
                                <p><span><span>– Sản phẩm lỗi kỹ thuật: Sản phẩm rách, bung keo, …</span></span>
                                </p>
                                <p><span><span>Trường hợp không được giải quyết</span></span>
                                </p>
                                <p><span><span>– Sản phầm đã qua sử dụng</span></span>
                                </p>
                                <p><span><span>Đối với sản phẩm lỗi kỹ thuật cần phản hồi đến TEELAB&nbsp;trong vòng 3 ngày, kể từ ngày mua hàng trên hoá đơn đối với khách mua trực tiếp tại cửa hàng, 3&nbsp;ngày kể từ ngày nhận hàng đối với khách mua online.&nbsp;</span></span>
                                </p>
                                <p><span><span
                                ><strong>2. PHƯƠNG THỨC ĐỔI SẢN PHẨM</strong></span></span>
                                </p>
                                <p>
                                    <span><span>– Hàng mua trực tiếp tại cửa hàng: Đổi trả trực tiếp tại cửa hàng mua hàng</span></span>
                                </p>
                                <p><span><span>– Hàng mua online (thông qua webiste, Shopee, Lazada): liên hệ fanpage <a
                                    href="http://fb.com/teelab.vn">Teelab</a>&nbsp;để được hướng dẫn đổi trả</span></span>
                                </p>
                                <p><span><span
                                ><strong>3. CHI PHÍ ĐỔI HÀNG</strong></span></span>
                                </p>
                                <p><span><span>– Miễn phí đổi hàng cho khách mua ở TEELAB&nbsp;trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư hỏng trong quá trình vận chuyển hàng.</span></span>
                                </p>
                                <p><span><span>– Trong trường hợp không vừa size hay khách hàng không ưng sản phẩm không muốn nhận hàng phiền khách hàng trả ship hoàn đơn hàng về</span></span>
                                </p>
                                <p><span><span
                                ><strong>TEELAB&nbsp;</strong></span></span>
                                </p>
                                <p><span><span><b>Experiment on Your Style</b></span></span>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterComponent/>
        </div>
    );
}

export default ExchangeScreen;
