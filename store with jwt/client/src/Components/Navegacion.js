import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navegacion.css';


class Navegacion extends Component {

    iniciarSesion = () => {
        this.props.auth.login();
    }

    cerrarSesion = () => {
        this.props.auth.logout();
    }

    render() {

        const { isAuthenticated } = this.props.auth;

        let resultado;

        if( isAuthenticated()) {
            resultado = <a onClick={this.cerrarSesion}>Log Out</a>
        } else {
            resultado = <a onClick={this.iniciarSesion}>Log In</a>
        }
        
        
        return (  
            <nav className="navegacion">
                <NavLink to={'/nosotros'} activeClassName="activo">About Us</NavLink>
                <NavLink to={'/productos'} activeClassName="activo">Products</NavLink>
                <NavLink to={'/contacto'} activeClassName="activo">Contact</NavLink>
                {resultado}
            </nav>
        );
    }
}
 
export default Navegacion;