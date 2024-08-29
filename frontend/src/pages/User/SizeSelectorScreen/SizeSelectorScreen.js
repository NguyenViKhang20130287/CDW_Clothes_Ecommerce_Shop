import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SizeSelectorScreen.css";

const SizeSelectorScreen = () => {
    return (
        <div>
            <section className="page">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <h1 className="title-head">Bảng size</h1>
                            <div className="content-page rte">
                                <p style={{"text-align": "justify"}}>
                                    <img data-thumb="original" original-height="5190" original-width="1603"
                                         src="//bizweb.dktcdn.net/100/415/697/files/bang-size.png?v=1639245000729" alt=""/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default SizeSelectorScreen;
