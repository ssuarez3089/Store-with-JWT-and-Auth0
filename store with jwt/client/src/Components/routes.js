import React from 'react';
import { Route, Router } from 'react-router-dom';

//componentes auth0
import Callback from './Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../history';

//componentes propios
import Header from './Header';
import Navegacion from './Navegacion';
import Productos from './Productos';
import Nosotros from './Nosotros';
import Contacto from './Contacto'
import SingleProducto from './SingleProducto';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>

        <div className="contenedor">

          <Header />

          <Navegacion auth={auth} />

          <Route exact path="/" render={(props) => (
              <Productos 
                  auth={auth} {...props}
               />
          )} />

          <Route exact path="/nosotros" component={Nosotros} />

          <Route exact path="/productos" render={ (props) => (
              <Productos 
                  auth={auth} {...props}
              />
          ) }/>

          <Route exact path="/producto/:productoid" render={(props) => {
              let idProducto = props.location.pathname.replace('/producto/','');
                return (
                  <SingleProducto 
                    producto={this.state.productos[idProducto]}
                    key={idProducto}
                    auth={auth} {...props}
                  />
                )
          }} />

          <Route exact path="/contacto" render={(props) => (
                <Contacto 
                  auth={auth} {...props}
                />
          )} />

          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>


        </div>
      </Router>
  );
}
