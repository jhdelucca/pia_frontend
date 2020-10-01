import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Orcamento from './pages/Orcamento';
import Register from './pages/Register';

export default function Routes() {
    return (
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/orcamento' component={Orcamento} />
                    <Route path='/register' component={Register} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}