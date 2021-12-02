import React from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../logo.svg';

const Header = () => {
    return (
        <div className="header">
            <h1>
                <img src={logo} className="App-logo" alt="logo" />
            </h1>
            <Nav>
                <NavItem>
                    <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Link</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Another Link</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink disabled href="#">Disabled Link</NavLink>
                </NavItem>
            </Nav>
        </div>
    );
}

export default Header;