import { Router } from "express";
import { AlunoController} from "../controllers/aluno.controller";

const alunoController = new AlunoController();
const alunoRoutes = Router();

alunoRoutes.get('/alunos', alunoController.selecionar);
alunoRoutes.post('/alunos', alunoController.inserir);
alunoRoutes.patch('/alunos', alunoController.alterar);
alunoRoutes.delete('/alunos', alunoController.deletar);

export default alunoRoutes; 