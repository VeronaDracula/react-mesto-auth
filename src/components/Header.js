import React from 'react';
import headerLogo from '../images/logo.svg';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <div>
                <img className="logo" src={headerLogo} alt="логотип"/>
            </div>
            <div className="header__user-actions">
                <p className="header__email">{props.email}</p>
                <Link to={props.link} className="header__link">{props.text}</Link>
            </div>
        </header>
    );
}

export default Header;