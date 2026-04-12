import React from 'react'
import {  useState } from "react"
import logo from '../../assets/images/12178616.png'
import '../../assets/navbar.css'
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
function NavbarComponents() {
   const [estaAbiertoNavbar, setEstaAbiertoNavbar] = useState(false);
  return (
    <div>
      <Navbar className='navbar-style' dark fixed='top' expand ='sm' >
        <NavbarBrand href="" className='navar-brand'>
          <img src={logo}  width={30} height={30} alt="Logo" />
          Task Manager

                </NavbarBrand>

        <NavbarToggler aria-label='Abrir Menú' aria-expanded={estaAbiertoNavbar} 
        onClick={()=>setEstaAbiertoNavbar(!estaAbiertoNavbar)} />
        <Collapse isOpen={estaAbiertoNavbar} navbar>
        <Nav className='ms-auto' navbar>
          <NavItem role='button'  >
            <NavLink className='custom-nav-item'>Cerrar Sesion</NavLink>
          </NavItem>

        </Nav>

        </Collapse>

      </Navbar>
    </div>
  )
}

export default NavbarComponents
