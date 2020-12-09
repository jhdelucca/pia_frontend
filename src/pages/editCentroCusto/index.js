import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/header/header';

import './styles.css';

export default function EditCentroCusto(props) {

    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [valorCusto, setValorCusto] = useState();
    const [limite, setLimite] = useState()
    const [centroCusto, setcentroCusto] = useState({});

    const id = props.match.params.id

    const usr_id = localStorage.getItem('usrId');

    const history = useHistory();

    useEffect(() => {
        api.get(`centrocusto/${id}`, {
            headers: {
                Authorization: usr_id
            }
        }).then(response => {
            setcentroCusto(response.data);
        })
        console.log(id);
    }, [])

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            tipo,
            valorCusto,
            limite
        }

        try {
        
        const response =  await api.put(`centrocusto/${id}`, data , {
            headers: {
                Authorization: usr_id,
            }
        });

        alert("Editado com sucesso");    

        history.push('/centrocusto')

        } catch (err) {
            console.log(err);
            alert('Erro na edição. Tente Novamente')
            document.getElementById("nome").value = "";
            document.getElementById("valorCusto").value = "";
            document.getElementById("limite").value = "";
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
            <div className="edit-container">
                <div className="content">
                    <section>
                        <h1>Centro de custo</h1>
                        <p>Edite seu centro de custo ! </p>
                    </section>

                    <form onSubmit={handleRegister} >
                        <input
                            id="nome"
                            className="form-control"
                            placeholder={centroCusto.nome}
                            value={nome}
                            onChange={e => setNome(e.target.value)} />

                        <select className="form-control" value={tipo} onChange={e => setTipo(e.target.value)}>
                            <option>Selecione Tipo (C - Credito / CC - Conta Corrente)</option>
                            <option>C</option>
                            <option>CC</option>
                        </select>

                        <input
                            id="valorCusto"
                            className="form-control"
                            placeholder={centroCusto.valorCusto}
                            value={valorCusto}
                            type="number"
                            onChange={e => setValorCusto(e.target.value)} />

                        <input
                            id="limite"
                            className="form-control"
                            placeholder={centroCusto.limite}
                            value={limite}
                            type="number"
                            onChange={e => setLimite(e.target.value)} />

                        <button className="btn-danger form-control" type="submit">Editar</button>
                    </form>

                    <Link className="back-link" to="/centrocusto">
                        <FiArrowLeft size={16} color="#E02041" />
                            Voltar para centro custo
                    </Link>
                </div>
            </div>
        </>

    );
}