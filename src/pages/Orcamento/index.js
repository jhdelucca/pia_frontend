import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiPlusSquare, FiEdit, FiFastForward } from 'react-icons/fi'
import Header from '../../components/header/header';
import api from '../../services/api';
import './styles.css'


export default function Orcamento() {
    const [orcamentos, setOrcamentos] = useState([]);
    const [idOrcamento, setIdOrcamento] = useState(0);
    const [gastos, setGastos] = useState([]);
    const usr_id = localStorage.getItem('usrId');

    const history = useHistory();

    useEffect(() => {

        api.get('orcamento').then(response => {
            setOrcamentos(response.data);
        })

        console.log(idOrcamento);

    }, []);

    useEffect(() => {
        var params = {
            orcamento_id: idOrcamento
        }

        var headers = {
            Authorization: usr_id
        }

        api.get('gastos', { params, headers }).then(response => {
            setGastos(response.data);
        })
        localStorage.setItem('orcamento_id', idOrcamento);

    }, [idOrcamento]);

    async function handleDeleteGastos(id) {
        try {
            await api.delete(`gastos/${id}`, {
                headers: {
                    Authorization: usr_id,
                }
            });
            alert("Deletado com sucesso")
            setGastos(gastos.filter(gasto => gasto.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente');
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

            <div className="orcamento-container">
                <section>
                    <select className="form-control" value={idOrcamento} onChange={e => setIdOrcamento(e.target.value)}>
                        <option>Selecione orcamento...</option>
                        {orcamentos.map(orcamento => (
                            <option key={orcamento.id} value={orcamento.id}>{orcamento.mes} / {orcamento.ano} </option>
                        ))}
                    </select>
                </section>
                
                {(idOrcamento != 0 ?          
                <div className="ajuste">
                    <h2>Orcamentos</h2>
                    
                    <Link to="/newOrcamento">
                        <FiPlusSquare size={40} />
                    </Link>
                </div>
            
                   : <div></div>
                   )}
                   <hr></hr>
                <ul>
                    {gastos.map(gasto => (
                        <li key={gasto.id}>
                            <strong>{gasto.nome}</strong>

                            <strong>VALOR MENSAL:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gasto.valorMensal)}</p>

                            <strong>VALOR JÁ GASTO:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gasto.valorGasto)}</p>

                            <Link to={`orcamento/${gasto.id}`} className="link" alt="gastos detalhados" >
                                <FiFastForward size={20} color="#007bff" />
                            </Link>

                            <div className="warnings">
                                <Link to={`editUser/${gasto.id}`}>
                                    <FiEdit size={20} color="#007bff" />
                                </Link>

                                <a href='#' onClick={() => handleDeleteGastos(gasto.id)}>
                                    <FiTrash2 size={20} color="#007bff"  />
                                </a>

                            </div>
                        </li>
                    ))}
                </ul>
             
            </div>

        </>
    );
}