import React, {Component, useState} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';


function AppNavbar(){
    const [isOpen, setIsOpen] = useState(false);
    //this.toggle = this.toggle.bind(this);

    function toggle() {
        setIsOpen ( () => !isOpen  );       
    }

    return(
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
        </Navbar>
    );

}

export default AppNavbar;