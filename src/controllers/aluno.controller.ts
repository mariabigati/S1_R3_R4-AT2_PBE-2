import { Request, Response } from "express";
import { AlunoService } from "../services/aluno.service";

export class AlunoController {
  constructor(private _service = new AlunoService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        res.status(200).json({ message: "Valor de ID inválido." });
      }

      if (id) {
        const alunos = await this._service.selecionarUm(id);
        if (alunos.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum aluno encontrado com este ID." });
        }
        res
          .status(200)
          .json({ message: "Aluno encontrado com sucesso!", data: alunos });
      }
      const alunos = await this._service.selecionarTodos();
      if (alunos.length < 1) {
        res.status(200).json({ message: "Nenhum registro encontrado." });
      }

      res
        .status(200)
        .json({ message: "Alunos encontrados com sucesso!", data: alunos });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };

  inserir = async (req: Request, res: Response) => {
    try {
      const { nome, email, matricula, curso, mediaFinal } = req.body;
      const novoAluno = await this._service.inserir(
        nome,
        email,
        matricula,
        curso,
        mediaFinal,
      );
      res
        .status(201)
        .json({ message: "Aluno cadastrado com sucesso!", data: novoAluno });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };

  alterar = async (req: Request, res: Response) => {
    try {
      const { nome, email, matricula, curso, mediaFinal } = req.body;
      const id = Number(req.query.id);
      const alterarAluno = await this._service.alterar(
        id,
        nome,
        email,
        matricula,
        curso,
        mediaFinal,
      );
      res.status(200).json({
        message: "Dados do aluno alterados com sucesso!",
        data: alterarAluno,
      });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };

  deletar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      const verificarId = await this._service.selecionarUm(id);
      if (verificarId.length < 1) {
        res
          .status(200)
          .json({ message: "Nenhum registro encontrado com esse ID." });
      }
      const deletarAluno = await this._service.deletar(id);
      res
        .status(200)
        .json({ message: "Aluno excluído com sucesso!", data: deletarAluno });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      }
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    }
  };
}
