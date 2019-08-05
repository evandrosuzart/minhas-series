import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const EditarGenero = ({match}) => {
    
    const [name, setName] = useState(match.params.name);
    const [sucess,setSucess] = useState(false);
    
    useEffect(() => {
        axios
        .get('/api/genres/'+match.params.id)
        .then( res => {
                setName(res.data.name)
            })
        },[match.params.id])

    const onChange = event => {
        setName(event.target.value);
    }
    
    const save = () =>  {
        axios.put('/api/genres/'+match.params.id, {
            name
        }).then(res => {
           
            setSucess(true);
        })
    }

    if(sucess){
        return (
            <Redirect to='/generos/'/> 
        )
    }
    return (
        <div className='container'> 
            <h1>Editar Gênero</h1>
            <form >
                <div className='form-group'>
                    <label for='name'>Nome do Gênero</label>
                    <input className='form-control'onChange={onChange} defaultValue={name} type='text' id='name' placeholder='Insira o nome do gênero aqui'></input>
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>

            </form>
        </div>
    )
} 

export default EditarGenero;