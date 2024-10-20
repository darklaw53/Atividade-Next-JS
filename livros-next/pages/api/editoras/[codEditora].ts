import { NextApiRequest, NextApiResponse } from 'next';
import { ControleEditora } from '../../../classes/controle/ControleEditora';

const controleEditora = new ControleEditora();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { codEditora } = req.query;

    try {
        switch (req.method) {
            case 'GET':
                if (typeof codEditora !== 'string') {
                    res.status(400).json({ message: 'Invalid codEditora' });
                    return;
                }

                const nomeEditora = await controleEditora.getNomeEditora(Number(codEditora));
                res.status(200).json({ nome: nomeEditora });
                break;

            default:
                res.setHeader('Allow', ['GET']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};