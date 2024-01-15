const axios = require('axios');
const { startServer, stopServer } = require('../../src/api');
const { clearDatabase, insertTestData } = require('../../src/db');

jest.setTimeout(10000);

beforeAll(async () => {
  await startServer(); // Inicia o servidor antes dos testes
  await clearDatabase(); // Limpa o banco de dados
  await insertTestData(); // Insere dados de teste no banco de dados
});

afterAll(async () => {
  await stopServer(); // Encerra o servidor após os testes
});

describe('Testes de integração para API de alunos', () => {
  test('GET /alunos retorna uma lista de alunos', async () => {
    const response = await axios.get('http://localhost:3000/alunos');
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.arrayContaining([expect.objectContaining({ nome: 'Aluno1' })]));
  });

  test('POST /alunos adiciona um novo aluno', async () => {
    const newStudent = { nome: 'NovoAluno', idade: 20 };
    const response = await axios.post('http://localhost:3000/alunos', newStudent);
    expect(response.status).toBe(201);

    const getResponse = await axios.get('http://localhost:3000/alunos');
    expect(getResponse.data).toEqual(expect.arrayContaining([expect.objectContaining(newStudent)]));
  });

});