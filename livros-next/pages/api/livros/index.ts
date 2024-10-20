import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivro } from '../../../classes/controle/ControleLivro';

export const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse): void => {
    try {
        const { codigo } = req.query;

        switch (req.method) {
            case 'GET':
                res.status(200).json(controleLivro.obterLivros());
                break;

            case 'POST':
                const newLivro = req.body;
                controleLivro.incluir(newLivro);
                res.status(200).json(newLivro);
                break;

            case 'DELETE':
                if (!codigo) {
                    res.status(400).json({ error: 'Código do livro não fornecido' });
                    break;
                }

                controleLivro.excluir(Number(codigo));
                res.status(200).json({ message: `Livro com código ${codigo} excluído com sucesso` });
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
                res.status(405).json({ error: `Método ${req.method} não permitido` });
                break;
        }
    } catch (error) {
        console.error('Erro interno do servidor:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};