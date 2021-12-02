import React from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';
import imgUrl from '../assets/images/imgUrl.js';

const Header = () => {
    return (
        <div className="header">
            <h1>
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