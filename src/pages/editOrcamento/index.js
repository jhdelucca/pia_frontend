import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/header/header';

import './styles.css';

export default function EditOrcamento(props) {

    const [nome, setNome] = useState('');
    const [valorMensal, setValorMensal] = useState();
    const [valorGasto, setValorGasto] = useState()
    const [orcamento, setOrcamento] = useState({});

    const id = props.match.params.id

    const usr_id = localStorage.getItem('usrId');

    const history = useHistory();

    useEffect(() => {
        api.get(`gastos/${id}`, {
            headers: {
                Authorization: usr_id
            }
        }).then(response => {
            setOrcamento(response.data);
        })
        console.log(id);
    }, [])

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            valorMensal,
            valorGasto
        }

        try {
        
        await api.put(`gastos/${id}`, data , {
            headers: {
                Authorization: usr_id,
            }
        });

        alert("Editado com sucesso");    

        history.push('/orcamento')

        } catch (err) {
            console.log(err);
            alert('Erro na edição. Tente Novamente')
            document.getElementById("nome").value = "";
            document.getElementById("valorMensal").value = "";
            document.getElementById("valoGasto").value = "";
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
                        <h1>Orcamento</h1>
                        <p>Edite seu orcamento ! </p>
                    </section>

                    <form onSubmit={handleRegister} >
                        <input
                            id="nome"
                            className="form-control"
                            placeholder={orcamento.nome}
                            value={nome}
                            onChange={e => setNome(e.target.value)} />

                        <input
                            id="valorMensal"
                            className="form-control"
                            placeholder={orcamento.valorMensal}
                            value={valorMensal}
                            onChange={e => setValorMensal(e.target.value)} />

                        <input
                            id="valorGasto"
                            className="form-control"
                            placeholder={orcamento.valorGasto}
                            value={valorGasto}
                            onChange={e => setValorGasto(e.target.value)} />

                        <button className="btn-danger form-control" type="submit">Editar</button>
                    </form>

                    <Link className="back-link" to="/orcamento">
                        <FiArrowLeft size={16} color="#E02041" />
                            Voltar para orcamento
                    </Link>
                </div>
            </div>
        </>

    );
}