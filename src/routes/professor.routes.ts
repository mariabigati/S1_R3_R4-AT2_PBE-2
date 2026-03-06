import { Router } from "express";
import { ProfessorController} from "../controllers/professor.controller";

const professorController = new ProfessorController();
const professorRoutes = Router();

professorRoutes.get('/professores', professorController.selecionar);
professorRoutes.post('/professores', professorController.inserir);
professorRoutes.patch('/professores', professorController.alterar);
professorRoutes.delete('/professores', professorController.deletar);

export default professorRoutes; 