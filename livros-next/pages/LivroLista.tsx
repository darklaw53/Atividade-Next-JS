import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Head from 'next/head'; 
import { Menu } from '../componentes/Menu'; 
import LinhaLivro from '../componentes/LinhaLivro'; 
import styles from '../styles/Home.module.css';
import { Livro } from '../classes/modelo/Livro';
import { useLivros } from '../context/LivrosContext';

const baseURL: string = "http://localhost:3000/api/livros";

const obterLivros = async (): Promise<Livro[]> => {
    try {
        const response = await fetch(baseURL);
        if (!response.ok) {
            throw new Error('Erro na resposta da rede');
        }
        const dados = await response.json();
        return dados.map((item: any) => new Livro(
            item.ano, 
            item.codigo, 
            item.codEditora, 
            item.titulo, 
            item.resumo, 
            item.autor, 
            item.autores
        )); 
    } catch (error) {
        console.error('Erro ao obter livros:', error);
        throw error; 
    }
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
    try {
        console.log(`Deleting book at URL: ${baseURL}/${codigo}`);
        const response = await fetch(`${baseURL}/${codigo}`, {
            method: 'DELETE',
        });

        console.log('Response:', response);
        
        if (!response.ok) {
            throw new Error('Erro ao excluir livro');
        }

        return true;
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        return false; 
    }
};

const LivroLista: NextPage = () => {
    const { livros, setLivros } = useLivros();
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        const fetchLivros = async () => {
            if (livros.length === 0) {
                const dados = await obterLivros();
                setLivros(dados);
            }
            setCarregado(true);
        };
        fetchLivros();
    }, [livros, setLivros]);

    const excluir = async (codigo: number) => {
        const sucesso = await excluirLivro(codigo);
        if (sucesso) {
            console.log(`Livro com código ${codigo} excluído com sucesso.`);
            setLivros((prevLivros) => prevLivros.filter((livro) => livro.codigo !== codigo));
        } else {
            console.error(`Falha ao excluir livro com código ${codigo}.`);
        }
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