import React, { useState, useEffect } from 'react';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;   
    excluir: (codigo: number) => Promise<void>; 
    index: number;  
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const { livro, excluir, index } = props;

    const controleEditora = new ControleEditora(); 

    const nomeEditora = controleEditora.getNomeEditora(livro.codigo) || 'Unknown Editora'; 

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

export default LinhaLivro;