import React from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';

const Footer = () => {
    return (
        <div className="footer">
            <h3>Footer Section</h3>
            <Nav className="footer_nav">
                <NavLink href="/">Home</NavLink>
            </Nav>
        </div>
    );
}

export default Footer;