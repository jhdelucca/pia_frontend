import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/header/header';

import './styles.css';

export default function NewOrcamento() {

    const [nome, setNome] = useState('');
    const [valorMensal, setValorMensal] = useState('');
    const valorGasto = 0;
    const idOrcamento = localStorage.getItem('orcamento_id');
    const usr_id = localStorage.getItem('usrId');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            valorMensal,
            valorGasto
        }

        try {

            await api.post('gastos', data, {
                headers: {
                    Authorization: usr_id,
                },
                params: {
                    orcamento_id: idOrcamento,
                }
            })

            alert(`Orcamento adicionado com sucesso !`)

            history.push('/orcamento')

        } catch (err) {
            console.log(err);
            alert('Erro no cadastro. Tente Novamente')
            document.getElementById("nome").value = "";
            document.getElementById("valor").value = "";
        }
    }

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
                            <a className="nav-link" href="/orcamento">Orcamento</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/centrocusto">Centro Custo</a>
                        </li>

                        <li className="nav-item">
                            <button class="btn btn-outline-light ml-3 my-2 my-sm-0" type="button"
                                onClick={() => handleLogout()}
                            >Sair</button>
                        </li>
                    </ul>
                </div>
            </Header>
            <div className="new-container">
                <div className="content">
                    <section>
                        <h1>Orcamento</h1>
                        <p>Adicione seu orcamento ! </p>
                    </section>

                    <form onSubmit={handleRegister} >
                        <input
                            id="nome"
                            className="form-control"
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)} />
                        <input
                            id="valor"
                            className="form-control"
                            placeholder="Valor em reais"
                            value={valorMensal}
                            type="number"
                            onChange={e => setValorMensal(e.target.value)} />

                        <button className="btn-danger form-control" type="submit">Adicionar</button>
                    </form>

                    <Link className="back-link" to="/orcamento">
                        <FiArrowLeft size={16} color="#E02041" />
                            Voltar para Login
                    </Link>
                </div>
            </div>
        </>

    );
}