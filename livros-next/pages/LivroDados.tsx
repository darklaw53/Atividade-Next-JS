import type { NextPage } from 'next';
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head'; 
import { Menu } from '../componentes/Menu';
import { ControleEditora} from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';
import { useRouter } from 'next/router';

const LivroDados: NextPage = () => {
    const controleEditora: ControleEditora = {
        getEditoras: () => [
            { codEditora: 1, nome: "Alta Books" },
            { codEditora: 2, nome: "Bookman" },
            { codEditora: 3, nome: "Addison Wesley" },
            { codEditora: 4, nome: "Pearson" }
        ],
        getNomeEditora: (codEditora: number) => {
            const editoras = controleEditora.getEditoras();
            const editora = editoras.find(editora => editora.codEditora === codEditora);
            return editora ? editora.nome : '';
        }
    };

    const baseURL: string = "http://localhost:3000/api/livros";

    const incluirLivro = async (livro: Livro): Promise<boolean> => {
        try {
            const response = await fetch('/api/livros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(livro),
            });
    
            console.log("Response status:", response.status);
            const responseBody = await response.text();
            console.log("Response body:", responseBody);
    
            if (!response.ok) {
                console.error("Failed to include book:", response.status, responseBody);
                return false; 
            }
    
            return true; 
        } catch (error) {
            console.error("Error in incluirLivro:", error);
            throw error;
        }
    };

    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));

    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(opcoes[0].value);
    
    const router = useRouter();

    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        console.log("Form submission initiated");
        console.log("Titulo:", titulo);
        console.log("Resumo:", resumo);
        console.log("Autores:", autores);
        console.log("CodEditora:", codEditora);
    
        const livro: Livro = {
            codigo: 0,
            ano: 0,
            titulo,
            resumo,
            autor: autores,
            autores: autores.split('\n').map(a => a.trim()), 
            codEditora
        };
    
        console.log("Livro object:", livro); 
    
        try {
            console.log("Calling incluirLivro...");
            const success = await incluirLivro(livro); 
            console.log("incluirLivro returned:", success); 
    
            if (success) {
                router.push('/LivroLista');
            } else {
                alert("Falha ao incluir livro");
            }
        } catch (error: unknown) {
            console.error("Error including book:", error); 
            alert("Falha ao incluir livro. Erro: " + (error instanceof Error ? error.message : "Erro inesperado."));
        }
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