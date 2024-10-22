import type { NextPage } from 'next';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head'; 
import { Menu } from '../componentes/Menu';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { ControleLivro } from '../classes/controle/ControleLivro'; 
import { Livro } from '../classes/modelo/Livro';
import { useRouter } from 'next/router';

const LivroDados: NextPage = () => {
    const controleEditora = new ControleEditora();
    const controleLivro = new ControleLivro(); 

    const router = useRouter();

    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(opcoes[0].value);

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const livro: Livro = {
            codigo: 0, 
            ano: 2024,  
            titulo,
            resumo,
            autor: autores, 
            autores: autores.split('\n').map(a => a.trim()), 
            codEditora
        };

        controleLivro.incluir(livro);

        router.push('/LivroLista');
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Dados do Livro</title>
                <meta name="description" content="Página para incluir um novo livro" />
            </Head>
            <Menu />
            <main>
                <h1>Dados do Livro</h1>
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
        </div>
    );
};

export default LivroDados;