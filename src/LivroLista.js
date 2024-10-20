import React, { useEffect, useState } from 'react';
import { useLivro } from './LivroContext'; 
import { ControleEditora } from './controle/ControleEditora'; 

const LinhaLivro = (props) => {
    const { livro, excluir, index } = props;

    const controleEditora = new ControleEditora(); 

    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora) || 'Unknown Editora'; 

    const backgroundColor = index % 2 === 0 ? '#f0f0f0' : '#dcdcdc';

    return (
        <tr style={{ backgroundColor }}>
            <td>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '10px' }}>
                    <span style={{ marginBottom: '10px' }}>{livro.titulo}</span>
                    <button 
                        onClick={() => excluir(livro.codigo)} 
                        style={{ 
                            backgroundColor: 'red', 
                            color: 'white', 
                            border: 'none', 
                            padding: '8px 15px', 
                            cursor: 'pointer', 
                            marginTop: '5px', 
                            borderRadius: '10px', 
                            marginBottom: '10px' 
                        }}
                    >
                        Excluir
                    </button>
                </div>
            </td>
            <td style={{ padding: '10px' }}>{livro.resumo}</td>
            <td style={{ padding: '10px' }}>{nomeEditora}</td>
            <td style={{ padding: '10px' }}>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

export const LivroLista = () => {
    const controleLivroInstancia = useLivro();
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        const obterLivros = async () => {
            const dadosLivros = controleLivroInstancia.obterLivros(); 
            setLivros(dadosLivros);
            setCarregado(true);
        };

        if (!carregado) {
            obterLivros();
        }
    }, [carregado, controleLivroInstancia]); 

    const excluir = (codLivro) => {
        controleLivroInstancia.excluir(codLivro);
        setCarregado(false);
    };

    return (
        <main>
            <h1>Catálogo de Livros</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: 'black', color: 'white' }}>
                    <tr>
                        <th style={{ padding: '10px' }}>Título</th>
                        <th style={{ padding: '10px' }}>Resumo</th>
                        <th style={{ padding: '10px' }}>Editora</th>
                        <th style={{ padding: '10px' }}>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro, index) => (
                        <LinhaLivro 
                            key={livro.codigo} 
                            livro={livro} 
                            excluir={excluir} 
                            index={index} 
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;