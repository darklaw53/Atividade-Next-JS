import React, { createContext, useContext } from 'react';
import { ControleLivro } from './controle/ControleLivro';

const LivroContext = createContext(null);

export const LivroProvider = ({ children }) => {
    const controleLivroInstancia = new ControleLivro();
    return (
        <LivroContext.Provider value={controleLivroInstancia}>
            {children}
        </LivroContext.Provider>
    );
};

export const useLivro = () => {
    return useContext(LivroContext);
};