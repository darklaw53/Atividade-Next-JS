import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Livro } from '../classes/modelo/Livro';

interface LivrosContextType {
    livros: Livro[];
    setLivros: React.Dispatch<React.SetStateAction<Livro[]>>; 
}

const LivrosContext = createContext<LivrosContextType | undefined>(undefined);

export const LivrosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [livros, setLivros] = useState<Livro[]>([]);

    return (
        <LivrosContext.Provider value={{ livros, setLivros }}>
            {children}
        </LivrosContext.Provider>
    );
};

export const useLivros = () => {
    const context = useContext(LivrosContext);
    if (!context) {
        throw new Error('useLivros must be used within a LivrosProvider');
    }
    return context;
};