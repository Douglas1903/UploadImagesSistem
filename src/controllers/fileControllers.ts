import { Request, Response } from 'express';
import { File } from '../types/fileTypes';
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware';
import connection from '../services/connection';

export const handleFileUpload = (req: Request, res: Response) => {

    const token = req.headers['authorization'];
    const authentication = authenticationMiddleware(token)
    if (!authentication) {
        return res.status(401).json({ error: 'Token inválido.' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const { filename } = req.file;
    const name = filename.split('_', 1);
    const sql_code = 'INSERT INTO files (filename, data) VALUES (?, ?)';

    connection.query(sql_code, [name, filename], (error, results, fields) => {
        if (error) {
            console.error('Erro ao inserir no banco de dados:', error);
            return res.status(500).json({ error: error });
        }

        return res.json({ filename });
    });
};

export const getFileList = (req: Request, res: Response) => {
    
    const token = req.headers['authorization'];
    const authentication = authenticationMiddleware(token)
    if (!authentication) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
    
    const sql_code = 'SELECT * FROM files';
    connection.query(sql_code, (error, results, fields) => {

        if (error) {
            console.error('Erro ao buscar arquivos no banco de dados:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }

        const resultsWithDecodedData = results.map((result: File) => {
            const decodedData = result.data.toString();
            return {
                id: result.id,
                filename: result.filename,
                data: decodedData
            };
        });

        return res.json(resultsWithDecodedData);
    });
};

export const getFileByName = (req: Request, res: Response) => {
    
    const token = req.headers['authorization'];
    const authentication = authenticationMiddleware(token)
    if (!authentication) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
    
    const { filename } = req.params;
    const sql_code = 'SELECT * FROM files WHERE filename =?';
    connection.query(sql_code, [filename], (error, results, fields) => {

        if (error) {
            console.error('Erro ao buscar arquivos no banco de dados:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }

        const resultsWithDecodedData = results.map((results: File) => {
            const decodedData = results.data.toString();
            return {
                id: results.id,
                filename: results.filename,
                data: decodedData
            };
        });

        return res.json(resultsWithDecodedData);
    });
};

export const deleteFileByName = (req: Request, res: Response) => {
    
    const token = req.headers['authorization'];
    const authentication = authenticationMiddleware(token)
    if (!authentication) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
    
    const { filename } = req.params;
    const sql_code = 'DELETE FROM files WHERE filename = ?';
    connection.query(sql_code, [filename], (error, results, fields) => {

        if (error) {
            console.error('Erro ao excluir arquivo do banco de dados:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Arquivo não encontrado.' });
        }

        return res.json({ message: 'Arquivo excluído com sucesso.' });
    });
};

export const updateFileName = (req: Request, res: Response) => {
    
    const token = req.headers['authorization'];
    const authentication = authenticationMiddleware(token)
    if (!authentication) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
    
    const { filename } = req.body;
    const { newFilename } = req.body;
    const sql_code = 'UPDATE files SET filename = ? WHERE filename = ?';
    if (!newFilename) {
        return res.status(400).json({ error: 'Novo nome do arquivo não fornecido.' });
    }
    connection.query(sql_code, [newFilename, filename], (error, results, fields) => {

        if (error) {
            console.error('Erro ao atualizar arquivo no banco de dados:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Arquivo não encontrado.' });
        }

        return res.json({ message: 'Arquivo atualizado com sucesso.' });
    });
};
