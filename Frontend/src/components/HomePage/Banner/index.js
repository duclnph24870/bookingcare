import { Component } from "react";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import "./Banner.scss";

class Banner extends Component {
    constructor (props) {
        super(props)

        this.state = {
            searchValue: ''
        }

        this.dataBtn = [
            { title: 'Khám Chuyên Khoa', icon:"https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png"},
            { title: '', icon:""},
            { title: 'Khám Từ Xa', icon:"https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png"},
            { title: '', icon:""},
            { title: 'Khám Tổng Quát', icon:"https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png"},
            { title: '', icon:""},
            { title: 'Xết Nghiệm Y Học', icon:"https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png"},
            { title: '', icon:""},
            { title: 'Sức Khỏe Tinh Thần', icon:"https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png"},
            { title: '', icon:""},
            { title: 'Khám Nha Khoa', icon:"https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png"},
            { title: '', icon:""},
            { title: 'Gói Phỗ Thuật', icon:"https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg"},
            { title: '', icon:""},
            { title: 'Sản Phẩm Y Tế', icon:"https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png"},
            { title: '', icon:""},
            { title: 'Sức Khỏe Doanh Ngiệp', icon:"https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png"},
            { title: '', icon:""},
        ]
    }

    render () {
        return (
            <div className="banner_wrapper">
                <div className="banner-content">
                    {/* search  */}
                    <div className="search">
                        <h1 className="search-title">< FormattedMessage id="banner.searchTitle"/></h1>
                        <h1 className="search-title">< FormattedMessage id="banner.searchTitle2"/></h1>
                        <div className="search-input">
                            <input 
                                type="text" 
                                value={this.state.searchValue} 
                                required 
                                placeholder="Tìm kiếm bệnh viện"
                                onChange={e => this.setState({ searchValue: e.target.value })} 
                            />
                            <i className="fas fa-search icon-search"></i>

                            <i 
                                className="fas fa-times icon-clear" 
                                onClick={() => {
                                    this.setState({ searchValue: '' });
                                }}
                            ></i>
                        </div>
                    </div>

                    {/* btn block  */}
                    <div className="banner-content-bottom">
                        { this.dataBtn.map((item,index) => {
                            let Component = "";
                            if (item.title.length > 0) {
                                Component = <div key={index} className="banner-content-btn">
                                                <div className="btn-icon">
                                                    <img src={item.icon} alt={item.title} />
                                                </div>
                                                {item.title}
                                            </div>
                            }else {
                                Component = <div key={index} className="banner-content-btn"></div>
                            }

                            return Component;
                        }) }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    }
}

const mapDispatchToProps = dispatch => {
    return {
    
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Banner);