import express from 'express';
import bodyParser from 'body-parser';
import {
    handleFileUpload,
    getFileList,
    getFileByName,
    deleteFileByName,
    updateFileName
} from './src/controllers/fileControllers';
import { uploadFileMiddleware } from './src/middlewares/fileMiddleware';

const app = express();

app.use(bodyParser.json());

app.use('/files', express.static("uploads"));

app.post('/upload', uploadFileMiddleware, handleFileUpload);

app.get('/files', getFileList);

app.get('/files/:filename', getFileByName);

app.delete('/files/:filename', deleteFileByName);

app.put('/files', updateFileName);

export default app