import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Orcamento from './pages/Orcamento';
import Register from './pages/Register';
import NewOrcamento from './pages/newOrcamento';
import CentroCusto from './pages/CentroCusto';
import NewCentroCusto from './pages/newCentroCusto';


export default function Routes() {
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/orcamento' component={Orcamento} />
                    <Route path='/newOrcamento' component={NewOrcamento} />
                    <Route path='/centrocusto' component={CentroCusto} />
                    <Route path='/newCentroCusto' component={NewCentroCusto} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}