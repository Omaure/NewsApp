import React, {Component, useState} from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import {FcHome, GoPerson,FcNews,GiNewspaper,FcInternal} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";

import {BrowserRouter as Router} from 'react-router-dom';
import {logoutUser} from "../../actions/userActions";

export default function NavbarPage() {

    const [isOpen, setState] = useState(false);

    const toggleCollapse = () => {
        setState(!isOpen);
    };

    const dispatch = useDispatch();


    return (
            <MDBNavbar color="black" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">News Application <FcInternal/></strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={() => {
                    toggleCollapse()
                }}/>
                <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <MDBNavLink to="/Home">Home  <FcNews/></MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/Sources">Sources <GiNewspaper/></MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBDropdown>
                                <MDBDropdownToggle nav caret>
                                    <GoPerson/>
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className="dropdown-default">
                                    <MDBDropdownItem onClick={()=>{dispatch(logoutUser())}}>Logout</MDBDropdownItem>
                                </MDBDropdownMenu>
                            </MDBDropdown>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
    );
}
