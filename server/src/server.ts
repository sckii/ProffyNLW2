import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//localhost:3333/users
//localhost:3333/contacts

//GET(Buscar ou Listar). POST(Criar). PUT(Atualizar). DELETE(Deletar). 

//Corpo da requisiçao (Request Body): Dados criaçao ou atualizaçao
//Route params: Identificar qual recurso atualizar ou deletar
//Query params: Paginaçao, filtros, ordenaçao 




app.listen(3333);