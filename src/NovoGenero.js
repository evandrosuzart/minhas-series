import React , {useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
const NovoGenero = () => {
    const [name, setName] = useState('');
    const [sucess,setSucess] = useState(false);
    
    const onChange = event => {
        setName(event.target.value);
        if(event.key === 'Enter'){
            this.save();
        }
    }

    const save = () =>  {
        axios.post('/api/genres', {
            name
        }).then(res => {
            setSucess(true);
        })
    }

    if(sucess){
        return (
            <Redirect to='/generos'/> 
        )
    }
    return (
        <div className='container'> 
            <h1>Novo Gênero</h1>
            <form >
                <div className='form-group'>
                    <label for='name'>Nome do Gênero</label>
                    <input className='form-control'onChange={onChange} type='text' id='name' placeholder='Insira o nome do gênero aqui'></input>
                </div>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>

            </form>
        </div>
    )
} 

export default NovoGenero;