import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiPlusSquare, FiEdit, FiFastForward } from 'react-icons/fi'
import Header from '../../components/header/header';
import api from '../../services/api';
import './styles.css'


export default function Gastos(props) {
    
    const [gastos, setGastos] = useState([]);
    const usr_id = localStorage.getItem('usrId');
    const [nome,setNome] = useState([]);
    
    const orcamento_id = props.match.params.id
    localStorage.setItem('detalhe_id',orcamento_id);

    const history = useHistory();

    useEffect(() => {

        api.get(`gastos-detalhados/${orcamento_id}` , {
            headers: {
                Authorization: usr_id
            }
        }).then(response => {
            setGastos(response.data);
        })

    }, []);


   /** async function handleCentroCusto(id) {

        var headers = {
            Authorization: usr_id
        }

        api.get(`centrocusto/${id}`, {headers}).then(response => {
            setNome(response.data);
        })
    }*/

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

            <div className="gasto-container">
                <section>
                    <h2>Gastos</h2>

                    <Link to="/newGasto">
                        <FiPlusSquare size={40} />
                    </Link>
                </section>
                
                   <hr></hr>
                <ul>
                    {gastos.map(gasto => (
                        
                        <li key={gasto.id}>
                            <strong>{gasto.titulo}</strong>

                            <strong>VALOR GASTO:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gasto.valor)}</p>
                            
                            <strong>CENTRO CUSTO ID:</strong>
                            <p>{gasto.centro_custo_id}</p>
                        </li>
                    ))}
                </ul>
             
            </div>

        </>
    );
}