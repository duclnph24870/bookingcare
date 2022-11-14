import { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { languages } from "../../../utils/constant";
import { changeLanguageApp } from "../../../store/actions";

import './Header.scss';

class Header extends Component {
    constructor (props) {
        super(props)
    }

    changeLanguage = (language) => {
        if (!(this.props.language === language)) {
            this.props.changeLanguageRedux(language);
        }
    }

    render () {
        let language = this.props.language;
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

                        <div className={language === languages.VI ? "VN language active" : "VN language"} onClick={e => this.changeLanguage(languages.VI)}>VN</div>
                        <div className={language === languages.EN ? "EN language active" : "EN language"} onClick={e => this.changeLanguage(languages.EN)}>EN</div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageRedux: language => dispatch(changeLanguageApp(language)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);