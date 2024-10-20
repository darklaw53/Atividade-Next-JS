import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLivro } from './LivroContext'; 
import { ControleEditora } from './controle/ControleEditora';
import { Livro } from './modelo/Livro';

const LivroDados = () => {
    const controleLivroInstancia = useLivro();
    const controleEditoraInstancia = new ControleEditora();

    const [opcoes, setOpcoes] = useState([]);
    const [codEditora, setCodEditora] = useState(0);

    useEffect(() => {
        const editoras = controleEditoraInstancia.getEditoras();
        setOpcoes(editoras.map(({ codEditora, nome }) => ({ value: codEditora, text: nome })));
        if (editoras.length > 0) {
            setCodEditora(editoras[0].codEditora);
        }
    }, []);

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');

    const navigate = useNavigate();

    const tratarCombo = (event) => {
        setCodEditora(Number(event.target.value)); 
    };

    const incluir = async (event) => {
        event.preventDefault();
    
        controleLivroInstancia.incluir(new Livro(
            codEditora, 
            codEditora,
            codEditora,
            titulo,
            resumo,
            autores,
            autores.split('\n'),
        ));
    };
    
    return (
        <main>
            <h1>Cadastro de Livro</h1>
            <form onSubmit={incluir}>
                <div>
                    <label>Título:</label>
                    <input 
                        type="text" 
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Resumo:</label>
                    <textarea 
                        value={resumo} 
                        onChange={(e) => setResumo(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Editora:</label>
                    <select value={codEditora} onChange={tratarCombo}>
                        {opcoes.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Autores (1 por linha):</label>
                    <textarea 
                        value={autores} 
                        onChange={(e) => setAutores(e.target.value)} 
                    />
                </div>
                <button type="submit">Incluir Livro</button>
            </form>
        </main>
    );
};

export default LivroDados;