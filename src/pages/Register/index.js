import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/header/header';

import './style.css';

export default function Register() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repeatSenha, setRepeatSenha] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email
        }

        if (repeatSenha !== senha) {
            alert("Senhas Incompativeis !");
        }

        try {

            const response = await api.post('usuarios', data, {
                headers: {
                    Authorization: senha,
                }
            })

            alert(`Usuario cadastrado com sucesso !`)

            history.push('/')

        } catch (err) {
            console.log(err);
            alert('Erro no cadastro. Tente Novamente')
        }
    }

    return (
        <>
            <Header />
            <div className="register-container">
                <div className="content">
                    <section>
                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro no My Budget ! </p>
                    </section>

                    <form onSubmit={handleRegister} >
                        <input
                            className="form-control"
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)} />
                        <input
                            className="form-control"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <input
                            className="form-control"
                            type="password"
                            placeholder="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)} />
                        <input
                            className="form-control"
                            type="password"
                            placeholder="senha"
                            value={repeatSenha}
                            onChange={e => setRepeatSenha(e.target.value)} />

                        <button className="btn-danger form-control" type="submit">Cadastrar</button>
                    </form>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                            Voltar para Login
                    </Link>
                </div>
            </div>
        </>

    );
}