import React, { Component } from 'react';
import '../css/Buscador.css';

class Buscador extends Component {

    leerDatos = (e) => {
        //termino de busqueda
        const termino = e.target.value;
        // enviar por props
        this.props.busqueda(termino);
    }

    render() { 
        return ( 
            <form className="buscador">
                <input type="text" placeholder="Search" onChange={this.leerDatos} />
            </form>
         );
    }
}
 
export default Buscador;