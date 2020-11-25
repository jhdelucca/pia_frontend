import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiTrash2, FiPlusSquare, FiEdit } from 'react-icons/fi'
import Header from '../../components/header/header';
import api from '../../services/api';
import './styles.css'


export default function CentroCusto() {

    const [centroCustos, setCentroCustos] = useState([]);
    const usr_id = localStorage.getItem('usrId');
    const history = useHistory();

    useEffect(() => {

        api.get('centrocusto', {
            headers: {
                Authorization: usr_id, 
            }
        }).then(response => {
            setCentroCustos(response.data);
            console.log(response.data);
        })
        
    }, []);

    async function handleDeleteCentroCusto(id) {
        try {
            await api.delete(`centrocusto/${id}`, {
                headers: {
                    Authorization: usr_id,
                }
            });
            alert("Deletado com sucesso")
            setCentroCustos(centroCustos.filter(custo => custo.id !== id));
        } catch (err) {
            alert('Erro ao deletar centro de custo, tente novamente');
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
                            <button className="btn btn-outline-light ml-3 my-2 my-sm-0" type="button"
                                onClick={() => handleLogout()}
                            >Sair</button>
                        </li>
                    </ul>
                </div>
            </Header>

            <div className="custo-container">
                <section>
                    <h2>Centro de Custo</h2>

                    <Link to="/newCentroCusto">
                        <FiPlusSquare size={40} />
                    </Link>
                </section>

                <hr></hr>

                <ul>
                    {centroCustos.map(custo => (
                        <li key={custo.id}>
                            <strong>{custo.nome}</strong>

                            <strong>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custo.valorCusto)}</strong>
                                
                            <strong>LIMITE:</strong>
                            {(custo.tipo == 'C' ?
                             <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custo.limite)}</p>
                             :
                             <p>Não tem limite</p>
                            )}
                           

                            <button className="excBtn" type="button" onClick={() => handleDeleteCentroCusto(custo.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>

                            <div className="mt-4">
                                <Link to={`editCusto/${custo.id}`}>
                                    <FiEdit size={20} color="#007bff" />
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>

        </>
    );
}