import { ProfessorRepository } from "../repository/professor.repository";
import { Professor } from "../models/professor.model";

export class ProfessorService {
    constructor( private _repository = new ProfessorRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarUm(id: number) {
    console.log(id)
    return await this._repository.findOne(id);
  }

  async inserir(nome: string, email: string, disciplina: string, cargaHoraria:number) {
    const professor = Professor.inserir(nome, email, disciplina, cargaHoraria);
    return await this._repository.create(professor);
  }

  async alterar(id: number, nome: string, email: string, disciplina: string, cargaHoraria:number) {
    const professor = Professor.alterar(nome, email, disciplina, cargaHoraria, id);
    return await this._repository.update(id, professor)
  }

  async deletar(id:number) {
    return await this._repository.delete(id)
  }
}