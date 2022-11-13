import Banner from './Banner/index.js';
import Header from './Header/index.js';

import './HomePage.scss';

const { Component } = require("react");

class HomePage extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <>
                <Header />
                <Banner />
            </>
        );
    }
}

export default HomePage;