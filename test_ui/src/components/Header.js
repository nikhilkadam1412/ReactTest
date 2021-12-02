import React from "react";
import { useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import imgUrl from '../assets/images/imgUrl.js';

const Header = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div className="header">
            <h1 onClick={goToHome}>
                <img src={imgUrl.brand_logo} className="" alt="logo" />
            </h1>
            <Nav>
                <NavItem>
                    <NavLink href="/">HOME</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/about-us">ABOUT</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/sign-in">SIGN IN</NavLink>
                </NavItem>
            </Nav>
        </div>
    );
}

export default Header;