import React, { Component } from 'react';
import Producto from './Producto';
import '../css/Productos.css';
import Buscador from './Buscador';
import axios from 'axios';

class Productos extends Component {

    state = {
        productos : [],
        terminoBusqueda : '',
    }

    componentWillMount() {
        
        this.queryAPI();
        }

        queryAPI = () => {
            //console.log(this.props.auth.getAccessToken());
            const { getAccessToken } = this.props.auth;

            const headers = { 'Authorization': `Bearer ${getAccessToken()}`}

            const url = 'http://localhost:5000/productos';
            
            return axios.get(url, {headers} )
                .then(res => this.setState({productos: res.data}));
        }

        busquedaProducto = (busqueda) => {
            if(busqueda.length > 1) {

                //obtener copia del state

                let productos = [...this.state.productos];

                //filtrat
                let resultado;

                resultado =  productos.filter(producto => (
                    producto.nombre.toLowerCase().indexOf( busqueda.toLowerCase() ) !== -1
                ))

                //enviar al state los productos filtrados y busqueda
                this.setState({
                    terminoBusqueda : busqueda,
                    productos: resultado
                })
            }else {
                this.setState({
                    terminoBusqueda: ''
                }, () => {
                    this.queryAPI();
                })
            }
        }

        login = () => {
            this.props.auth.login();
        }

    render() { 

        const { isAuthenticated } = this.props.auth;
        return ( 
            <div className="productos">
                    { isAuthenticated() && (
                        <React.Fragment>
                            <h2>Our Products</h2>
                                <Buscador 
                                    busqueda={this.busquedaProducto}
                                /> 
                                <ul className="lista-productos">
                                    {Object.keys(this.state.productos).map(producto => ( 
                                        <Producto 
                                            informacion={this.state.productos[producto]} 
                                            key={producto} 
                                         />
                                    ))}     
                                </ul> 
                        </React.Fragment>  
                        )
                    }
                          {
                              !isAuthenticated() && (
                                  <div className="contenedor-boton">
                                    <p>to see the content you must be logged in</p>
                                    <a className="boton" onClick={ this.login }>Log In</a>
                                  </div>
                              )
                          }
                        
            </div>
         );
    }
}
 
export default Productos;