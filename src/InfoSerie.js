import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {Badge} from 'reactstrap';

const InfoSerie = ({match}) => {
    
    const [form, setForm] = useState({
        name: ''
    });
    const [sucess,setSucess] = useState(false);
    const [mode, setMode] = useState('INFO');
    const [genres, setGenres] = useState([]);
    const [data, setData] = useState({});
    const [genreId, setGenreId] = useState('');
    
    
    
    useEffect(() => {
        axios
        .get('/api/series/'+match.params.id)
        .then( res => {
                setData(res.data);
                setForm(res.data)
            })
    },[match.params.id])

    useEffect(() => {
        axios
        .get('/api/genres/')
        .then(res => {
            setGenres(res.data.data)
            const genres = res.data.data;
            const encontrado = genres.find(value => 
                data.genre === value.name);
            if(encontrado){
                setGenreId(encontrado.id);
            }
        })
    },[data])

    // custom header

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
   }

    const onchangeGenere = evt => {
        setGenreId(evt.target.value)
    }

    const onChange = field => event => {
       setForm({
           ...form,
           [field]: event.target.value
       })
    }

    const seleciona = value => () =>  {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () =>  {
        axios
            .put('/api/series/'+match.params.id,{
                ...form,
                genre_id: genreId
            })
        .then(res => {
            setSucess(true);
        })
    }

    if(sucess){
        
           return  <Redirect to='/series/'/> 
        
    }
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100 ' style={{background:'rgba(0,0,0,0.7)'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    {data.status === 'PARA_ASSISTIR'  && <Badge color='warning'>Para Assistir</Badge>}
                                    Gênero:{data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {
                mode === 'EDIT' && 
             
                <div className='container'> 
                    <h1>Editar Série</h1>
                    <button  className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar edição</button>
                    <form >
                        <div className='form-group'>
                            <label htmlFor='name'>Nome da Série</label>
                            <input className='form-control'onChange={onChange('name')} defaultValue={form.name} type='text' id='name' placeholder='Insira o nome da série aqui'></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comentários</label>
                            <input className='form-control' onChange={onChange('comments')} defaultValue={form.comments} type='text' id='name' placeholder='Insira aqui os seu comentários'></input>
                        </div >
                        <div className='form-group'>
                            <label htmlFor='genre'>Gênero</label>
                            <select className='form-control' value={genreId} onChange={onchangeGenere}>
                            {genres.map(genre => 
                                
                                    <option key={genre.id} value={genre.id}  >{genre.name}</option>
                                
                            )}
                            </select>   
                        </div>
                        <div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='assistido'  checked={form.status === 'ASSISTIDO'} value='ASSISTIDO' onChange={seleciona('ASSISTIDO')} />
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='paraAssistir' checked={form.status === 'PARA_ASSISTIR'} value='PARA_ASSISTIR' onChange={seleciona('PARA_ASSISTIR')} />
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para assistir
                            </label>
                        </div>
                        </div>
                        <button   className='btn btn-primary' onClick={save} >Salvar</button>
                       
                    </form>
                </div>
            }
        </div>
    )
} 

export default InfoSerie; 