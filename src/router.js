import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Orcamento from './pages/Orcamento';
import Register from './pages/Register';
import NewOrcamento from './pages/newOrcamento';
import CentroCusto from './pages/CentroCusto';
import NewCentroCusto from './pages/newCentroCusto';
import EditCentroCusto from './pages/editCentroCusto';
import Gastos from './pages/Gastos';
import NewGasto from './pages/newGastos';
import EditOrcamento from './pages/editOrcamento';


export default function Routes() {
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/orcamento' component={Orcamento} />
                    <Route path='/editOrcamento/:id' component={EditOrcamento} />
                    <Route path='/newOrcamento' component={NewOrcamento} />
                    <Route path='/centrocusto' component={CentroCusto} />
                    <Route path='/newCentroCusto' component={NewCentroCusto} />
                    <Route path='/editCusto/:id' component={EditCentroCusto} />
                    <Route path='/gasto/:id' component={Gastos} />
                    <Route path='/newGasto' component={NewGasto} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}