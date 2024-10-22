import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head'; 
import { Menu } from '../componentes/Menu';
import { ControleLivro } from '../classes/controle/ControleLivro'; 
import LinhaLivro from '../componentes/LinhaLivro';
import { Livro } from '../classes/modelo/Livro';

const LivroLista: NextPage = () => {
    const controleLivro = new ControleLivro(); 
    const [livros, setLivros] = useState<Array<Livro>>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        const fetchLivros = () => {
            const dados = controleLivro.obterLivros(); 
            setLivros(dados);
            setCarregado(true);
        };
        fetchLivros();
    }, []);

    const excluir = async (codigo: number): Promise<void> => {
        controleLivro.excluir(codigo);
        
        setLivros(prevLivros => {
            const updatedLivros = prevLivros.filter(livro => livro.codigo !== codigo);
            return updatedLivros;
        });
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Lista de Livros</title>
                <meta name="description" content="Exibição de livros cadastrados" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Menu />
            <main>
                <h1>Catálogo de Livros</h1>
                {carregado ? (
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
                ) : (
                    <p>Carregando livros...</p>
                )}
            </main>
        </div>
    );
};

export default LivroLista;