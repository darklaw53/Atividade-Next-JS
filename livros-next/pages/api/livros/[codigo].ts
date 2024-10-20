import type { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivro } from '../../../classes/controle/ControleLivro';

export const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse): void => {
    const { codigo } = req.query;

    try {
        switch (req.method) {
            case 'DELETE':
                controleLivro.excluir(Number(codigo));
                res.status(204).end(); 
                break;
            default:
                res.setHeader('Allow', ['DELETE']);
                res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        }
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};