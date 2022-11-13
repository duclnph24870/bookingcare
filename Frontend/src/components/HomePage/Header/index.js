import { Component } from "react";
import { FormattedMessage } from 'react-intl';

import './Header.scss';

class Header extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <button>
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="home-header-logo">
                            <img src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt=""/>
                        </div>
                    </div>

                    <div className="center-content">
                        <div className="center-content-item">
                            <h1 className="center-content-title">< FormattedMessage id="home-header.specialty"/></h1>
                            <span className="center-content-label">< FormattedMessage id="home-header.searchDoctor"/></span>
                        </div>

                        <div className="center-content-item">
                            <h1 className="center-content-title">< FormattedMessage id="home-header.healthFacility"/></h1>
                            <span className="center-content-label">< FormattedMessage id="home-header.healthFacilityLabel"/></span>
                        </div>

                        <div className="center-content-item">
                            <h1 className="center-content-title">< FormattedMessage id="home-header.doctor"/></h1>
                            <span className="center-content-label">< FormattedMessage id="home-header.doctorLabel"/></span>
                        </div>

                        <div className="center-content-item">
                            <h1 className="center-content-title">< FormattedMessage id="home-header.medicalPackage"/></h1>
                            <span className="center-content-label">< FormattedMessage id="home-header.medicalPackageLabel"/></span>
                        </div>
                    </div>

                    <div className="right-content">
                        <button className="right-content-held">
                            <i className="fas fa-question"></i>
                            < FormattedMessage id="home-header.support"/>
                        </button>

                        <div className="VN language active">VN</div>
                        <div className="EN language">EN</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;