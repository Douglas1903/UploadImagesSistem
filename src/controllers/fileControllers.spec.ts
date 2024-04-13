import  supertest from 'supertest';
import { join } from 'path'

import app from '../../index';

const token = 'Tudo@2020';

describe('File Controller', () => {

	it('should upload file', async () => {
		const response = await supertest(app).post('/upload')
		.set('Content-Type', 'multipart/form-data')
		.set('Authorization', token)
		.attach('file', join(__dirname, 'upload', 'minimal-wallpaper-20081414173331-scaled.jpg'))
	})

	it('should get list of files', async () => {
		const response = await supertest(app)
		.get('/files')
		expect(response.status == 301).toBe(true);
	});
	
	it('should get file by name', async () => {
		const fileName = '1712861908075';
		const response = await supertest(app)
		.get(`/files/${fileName}`)
        .set('Authorization', token);

		expect(response.status).toBe(200);
	});
	
	it('should delete file by name', async () => {
		const fileName = '1712870138000';
		const response = await supertest(app)
		.delete(`/files/${fileName}`)
		.set('Authorization', token);

		expect(response.status).toBe(200);
	});

	it('should update file name', async () => {
		const data = {
			filename: '1712870163078',
			newFilename: 'Eliper'
		};
		const response = await supertest(app)
			.put(`/files`)
			.set('Authorization', token)
			.send(data);
		expect(response.status).toBe(200);
	});

});
