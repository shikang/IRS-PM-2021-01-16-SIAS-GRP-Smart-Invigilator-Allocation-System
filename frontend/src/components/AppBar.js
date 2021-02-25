import React, { Component } from 'react';
import './AppBar.css'

import { 
    Collapse,
    Nav,
    Navbar, 
    NavbarBrand, 
    NavItem,
    NavLink,
    NavbarToggler 
} from "shards-react";

import MainState from "../enums/MainState";

class AppBar extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNavbar = this.toggleNavbar.bind(this);
    
        this.state = {
          collapseOpen: false
        };
    }

    toggleNavbar() {
        this.setState({
            ...this.state,
            ...{
                collapseOpen: !this.state.collapseOpen
            }
        });
    }

    render() {
        return (
            <Navbar type="dark" theme="primary" expand="md">
                <NavbarBrand href="#">Smart Invigilator Allocation System</NavbarBrand>
                {/*<NavbarToggler onClick={this.toggleNavbar} />*/}

                <Collapse open={this.state.collapseOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="#" active onClick={() => this.props.updateMainState(MainState.ENTER_PREFERENCES)}>
                                Bid
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" active onClick={() => this.props.updateMainState(MainState.VIEW_ALLOCATIONS)}>
                                Allocations
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default AppBar;