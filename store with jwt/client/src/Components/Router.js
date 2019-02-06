import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Navegacion from './Navegacion';
import Productos from './Productos';
import Nosotros from './Nosotros';
import Contacto from './Contacto'
import Error from './Error';
import SingleProducto from './SingleProducto';
import infoProductos from '../Datos/Datos.json';


class Router extends Component {

    state = {
        productos : [],
        terminoBusqueda : '',
    }

    componentWillMount() {
        this.setState({
            productos : infoProductos
        })
    }

    busquedaProducto = (busqueda) => {
        if(busqueda.length > 1) {
            this.setState({
                terminoBusqueda : busqueda
            })
        }else {
            this.setState({
                terminoBusqueda: ''
            })
        }
    }

    render() { 

        let productos = [...this.state.productos];

        let busqueda = this.state.terminoBusqueda;

        let resultado;

            if(busqueda !== '') {
                resultado =  productos.filter(producto => (
                    producto.nombre.toLowerCase().indexOf( busqueda.toLowerCase() ) !== -1
                ))
            } else {
                resultado = productos;
            }

        return ( 
            <BrowserRouter>
                <div className="contenedor">
                    <Header />
                    <Navegacion />
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Productos 
                                    productos={resultado}
                                    busquedaProducto={this.busquedaProducto}
                                />
                            )} />
                            <Route exact path="/nosotros" component={Nosotros} />
                            <Route exact path="/productos" render={ () => (
                                <Productos 
                                    productos={resultado}
                                    busquedaProducto={this.busquedaProducto}
                                />
                            ) }/>
                            <Route exact path="/producto/:productoid" render={(props) => {
                                let idProducto = props.location.pathname.replace('/producto/','');
                                    return (
                                        <SingleProducto 
                                            producto={this.state.productos[idProducto]}
                                            key={idProducto}
                                        />
                                    )
                            }} />
                            <Route exact path="/contacto" component={Contacto} />
                            <Route component={Error} />
                        </Switch>
                </div>        
            </BrowserRouter>
         );
    }
}
 
export default Router;