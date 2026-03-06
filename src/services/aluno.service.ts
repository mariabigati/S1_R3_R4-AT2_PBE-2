import { AlunoRepository } from "../repository/aluno.repository";
import { Aluno } from "../models/aluno.model";

export class AlunoService {
    constructor( private _repository = new AlunoRepository()) {}

    async selecionarTodos() {
        return await this._repository.findAll();
    }

    async selecionarUm(id: number) {
    console.log(id)
    return await this._repository.findOne(id);
  }

  async inserir(nome: string, email: string, matricula: string, curso: string, mediaFinal:number) {
    const aluno = Aluno.inserir(nome, email, matricula, curso, mediaFinal);
    console.log("Aluno:", aluno)
    return await this._repository.create(aluno);
  }

  async alterar(id: number, nome: string, email: string, matricula: string, curso: string, mediaFinal:number) {
    const aluno = Aluno.alterar(nome, email, matricula, curso, mediaFinal, id);
    return await this._repository.update(id, aluno)
  }

  async deletar(id:number) {
    return await this._repository.delete(id)
  }
}