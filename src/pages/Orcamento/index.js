import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import Header from '../../components/header/header';



export default function Orcamento() {
    const history = useHistory();

    async function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <>
            <Header>
                <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="menu" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-md-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Orcamento</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Centro Custo</a>
                        </li>
                    </ul>
                </div>
            </Header>

            <h1>Olá Teste</h1>

            <button type="button" onClick={() => handleLogout()}>
                <FiPower size={18} color="#E02041" />
            </button>
        </>
    );
}