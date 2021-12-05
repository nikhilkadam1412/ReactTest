import React from "react";
import { useHistory } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import imgUrl from '../assets/images/imgUrl.js';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({setAuth}) => {
    const history = useHistory();

    const goToHome = () => {
        history.push('/');
    }

    const toastBox = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: '',
    }

    const logout = async e => {
        e.preventDefault();
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("DataObj");
          localStorage.setItem('loggedIN', false);
          setAuth(false);
          let path = `/`;
          toast.success("Logout successfully");
          history.push(path);
        } catch (err) {
          console.error(err.message);
        }
    };

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
                <NavItem>{
                        localStorage.getItem('loggedIN') == 'false' ?
                        <NavLink href="/sign-in">SIGN IN</NavLink> :
                        <NavLink onClick={logout} style={{cursor: 'pointer'}}>LOGOUT</NavLink>
                    }
                </NavItem>
                
            </Nav>
        </div>
    );
}

export default Header;