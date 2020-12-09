import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/header/header';

import './styles.css';

export default function NewGasto() {

    const [titulo, setTitulo] = useState('');
    const [valor, setValor] = useState();
    const [centroCustos, setCentroCustos] = useState([]);
    const [centro_custo_id,setIdCusto] = useState();
    const gasto_id = localStorage.getItem('detalhe_id');

    const usr_id = localStorage.getItem('usrId');

    const history = useHistory();

    useEffect(() => {
        var headers = {
            Authorization: usr_id
        }
        api.get('centrocusto', {headers}).then(response => {
            setCentroCustos(response.data);
        })

    }, []);

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            titulo,
            valor  
        }

        var params = {
            centro_custo_id,
            gasto_id
        }

        var headers = {
            Authorization: usr_id
        }

        try {

            await api.post('gastos-detalhados', data, { headers , params})

            alert(`Gasto adicionado com sucesso !`)

            history.push(`/gasto/${gasto_id}`)

        } catch (err) {
            console.log(err);
            alert('Erro no cadastro. Tente Novamente')
            document.getElementById("titulo").value = "";
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
                        <h1>Gasto</h1>
                        <p>Adicione seu gasto ! </p>
                    </section>

                    <form onSubmit={handleRegister} >
                        <input
                            id="titulo"
                            className="form-control"
                            placeholder="Titulo"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)} />
                        <input
                            id="valor"
                            className="form-control"
                            placeholder="Valor do gasto em reais"
                            type="number"
                            value={valor}
                            onChange={e => setValor(e.target.value)} />

                        <select className="form-control" value={centro_custo_id} onChange={e => setIdCusto(e.target.value)}>
                            <option>Selecione centro custo..</option>
                            {centroCustos.map(centroCusto => (
                                <option key={centroCusto.id} value={centroCusto.id}>{centroCusto.nome}</option>
                            ))}
                        </select>

                        <button className="btn-danger form-control" type="submit">Adicionar</button>
                    </form>

                    <Link className="back-link" to={`gasto/${gasto_id}`}>
                        <FiArrowLeft size={16} color="#E02041" />
                            Voltar para gastos
                    </Link>
                </div>
            </div>
        </>

    );
}