import React from "react";
import { Nav, NavItem, NavLink } from 'reactstrap';

const Footer = () => {
    return (
        <div>
            <p>Link Based</p>
            <Nav>
                <NavLink href="#">Link</NavLink>
            </Nav>
        </div>
    );
}

export default Footer;