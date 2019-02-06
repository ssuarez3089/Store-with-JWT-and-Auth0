import React, { Component } from 'react';
import '../css/Contacto.css'

class Contacto extends Component {

    login = () => {
        this.props.auth.login();
    }

    render() {

        const { isAuthenticated } = this.props.auth;

    return ( 
        <React.Fragment>
           {isAuthenticated() && (
                <form>
                    <legend>Contact Form</legend>
                    <div className="input-field">
                        <label>Name: </label>
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div className="input-field">
                        <label>Email: </label>
                        <input type="text" placeholder="Your E-mail" />
                    </div>
                    <div className="input-field">
                        <label>Message: </label>
                        <textarea></textarea>
                    </div>
                    <div className="input-field enviar">
                        <input type="submit" value="Send" />
                    </div>
                </form>
           )}

            {
                !isAuthenticated() && (
                    <div className="contenedor-boton">
                        <p>to send a message you must be logged in</p>
                        <a className="boton" onClick={ this.login }>Log In</a>
                </div>
            )}
            </React.Fragment>
        );
    }  
}
 
export default Contacto;