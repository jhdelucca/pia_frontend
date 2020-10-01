import React, { useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './style.css'
import Header from '../../components/header/header';

export default function Login() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();


    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', { id, email });
            console.log(response.data.nome);

            localStorage.setItem('usrId', id);
            localStorage.setItem('usrName', response.data.nome);

            history.push('/orcamento')
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <>
            <Header />
            <div className="login-container">
                <section className="form-login">
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <h1>Faça seu login</h1>

                            <input
                                className="form-control"
                                type="email"
                                placeholder="Sua email"
                                value={email}
                                onChange={e => setEmail(e.target.value)} />

                            <input
                                className="form-control"
                                type="password"
                                placeholder="Sua senha"
                                value={id}
                                onChange={e => setId(e.target.value)} />

                            <button className="btn-danger form-control" type="submit">Entrar</button>

                            <Link className="back-link" to="/register">
                                <FiLogIn size={16} color="#E02041" />
                                Não tenho cadastro
                            </Link>
                        </div>
                    </form>
                </section>
            </div>
        </>
    )
}