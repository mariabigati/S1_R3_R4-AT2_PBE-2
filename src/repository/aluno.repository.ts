import { db } from "../database/connection.database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

import { Aluno } from "../models/aluno.model";


export class AlunoRepository {
  async findAll(): Promise<RowDataPacket[]> {
    const [rows] = await db.execute<RowDataPacket[]>("SELECT * FROM alunos;");
    return rows;
  }

  async findOne(id: number): Promise<RowDataPacket[]> {
    const sql = "SELECT * FROM alunos WHERE idAluno=?;";
    const values = [id];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    console.log(rows);
    return rows;
  }

  async create(dados: Omit<Aluno, 'id'>):Promise<ResultSetHeader> {
        const sql='INSERT INTO alunos (nomeAluno, emailAluno, matricula, curso, mediaFinal) VALUES (?,?,?,?,?);';
        const values = [dados.Nome, dados.Email, dados.Matricula, dados.Curso, dados.MediaFinal];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async update(id: number, dados: Omit<Aluno, 'id'>):Promise<ResultSetHeader> {
        const sql='UPDATE alunos SET nomeAluno =?,  emailAluno=?, matricula=?, curso=?, mediaFinal=? WHERE idAluno=?;';
        const values = [dados.Nome, dados.Email, dados.Matricula, dados.Curso, dados.MediaFinal, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number):Promise<ResultSetHeader> {
        const sql='DELETE FROM alunos WHERE idAluno=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}
