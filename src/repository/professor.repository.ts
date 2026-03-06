import { db } from "../database/connection.database";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

import { Professor } from "../models/professor.model";


export class ProfessorRepository {
  async findAll(): Promise<RowDataPacket[]> {
    const [rows] = await db.execute<RowDataPacket[]>("SELECT * FROM professores;");
    return rows;
  }

  async findOne(id: number): Promise<RowDataPacket[]> {
    const sql = "SELECT * FROM professores WHERE idProfessor=?;";
    const values = [id];
    const [rows] = await db.execute<RowDataPacket[]>(sql, values);
    console.log(rows);
    return rows;
  }

  async create(dados: Omit<Professor, 'id'>):Promise<ResultSetHeader> {
        const sql='INSERT INTO professores (nomeProfessor, emailProfessor, disciplina, cargaHoraria) VALUES (?,?,?,?);';
        const values = [dados.Nome, dados.Email, dados.Disciplina, dados.CargaHoraria];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    } 

    async update(id: number, dados: Omit<Professor, 'id'>):Promise<ResultSetHeader> {
        const sql='UPDATE professores SET nomeProfessor =?,  emailProfessor=?, disciplina=?, cargaHoraria=? WHERE idProfessor=?;';
        const values = [dados.Nome, dados.Email, dados.Disciplina, dados.CargaHoraria, id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }

    async delete(id: number):Promise<ResultSetHeader> {
        const sql='DELETE FROM professores WHERE idProfessor=?;';
        const values = [id];
        const [rows] = await db.execute<ResultSetHeader>(sql, values);
        return rows;
    }
}
