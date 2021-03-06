import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const Series = () => {
    const [data,setData] = useState([]);
    useEffect(() => {
        axios.get('/api/series').then(res => {
            setData(res.data.data)
        })
    },[]);

    const renderLinhas = record =>  {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
                    <Link className='btn btn-warning' to={'/series/'+record.id}>Info</Link>
                </td>
            </tr>
        )
                
    }

    

    const deleteGenero = id => {
        axios.delete('/api/series/'+id).then(
            res => {
            const filtro = data.filter(item => item.id !== id );
            setData(filtro);
            }
        )
    }
    if(data.length === 0 ){
        return (
            <div className='container'>
                <h1>Series</h1>
                <div><Link  className='btn btn-primary' to='/series/novo'>Nova Série</Link></div>
                <div className='alert alert-warning' role='alert'>
                    Você não possui séries criadas
                </div>
            </div>   
        )
    }

    return (
      <div className='container'>
          <h1>Séries</h1>
          <div><Link className='btn btn-primary' to='/series/novo'>Nova Série</Link></div>
            <table className='table table-striped'>
            <thead>
                <tr>
                <th scope='col'>ID</th>
                <th scope='col'>NOME</th>
                <th scope='col'>AÇÕES</th>
                </tr>
            </thead>
            <tbody>
                {data.map(renderLinhas)}
                
            </tbody>
            </table>
      </div>
    )
}

export default Series;