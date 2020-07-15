import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'

import Home from './Components/Home'
import Cervecerias from './Components/Cervecerias'
import Facultades from './Components/Facultades'
import Supermercados from './Components/Supermercados'
import Emergencias from './Components/Emergencias'
import Farmacias from './Components/Farmacias'
import AgregarLugar from './Components/AgregarLugar'

function App() {
  return (

  <Router>
    <Switch>

    <Route exact path = "/" component={Home}/>
    <Route exact path = "/cervecerias" component={Cervecerias}/>
    <Route exact path = "/facultades" component={Facultades}/>
    <Route exact path = "/supermercados" component={Supermercados}/>
    <Route exact path = "/emergencias" component={Emergencias}/>
    <Route exact path = "/farmacias" component={Farmacias}/>
    <Route exact path = "/agregar" component={AgregarLugar}/>
    </Switch>

  </Router>
  );
}

export default App;
