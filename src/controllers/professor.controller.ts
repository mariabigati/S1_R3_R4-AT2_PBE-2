import { Request, Response } from "express";
import { ProfessorService } from "../services/professor.service";

export class ProfessorController {
  constructor(private _service = new ProfessorService()) {}

  selecionar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.query.id);
      if (isNaN(id)) {
        res.status(200).json({ message: "Valor de ID inválido." });
      };

      if (id) {
        const professores = await this._service.selecionarUm(id);
        if (professores.length < 1) {
          res
            .status(200)
            .json({ message: "Nenhum professor encontrado com este ID." });
        };
        res
          .status(200)
          .json({ message: "Professor encontrado com sucesso!", data: professores });
      };
      const professores = await this._service.selecionarTodos();
      if (professores.length < 1) {
        res.status(200).json({ message: "Nenhum registro encontrado." });
      };

      res
        .status(200)
        .json({ message: "Professores encontrados com sucesso!", data: professores });
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
      const { nome, email, disciplina, cargaHoraria } = req.body;
      const novoProfessor = await this._service.inserir(
        nome,
        email,
        disciplina,
        cargaHoraria
      );
      res
        .status(201)
        .json({ message: "Professor cadastrado com sucesso!", data: novoProfessor });
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
    };
  };

  alterar = async (req: Request, res: Response) => {
    try {
      const {  nome, email, disciplina, cargaHoraria  } = req.body;
      const id = Number(req.query.id);
      const alterarProfessor = await this._service.alterar(
        id,
        nome,
        email,
        disciplina,
        cargaHoraria
      );
      res.status(200).json({
        message: "Dados do professor alterados com sucesso!",
        data: alterarProfessor,
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
    };
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
      const deletarProfessor = await this._service.deletar(id);
      res
        .status(200)
        .json({ message: "Professor excluído com sucesso!", data: deletarProfessor });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: "Ocorreu um erro no servidor.",
          errorMessage: error.message,
        });
      };
      res.status(500).json({
        message: "Ocorreu um erro no servidor.",
        errorMessage: "Erro desconhecido.",
      });
    };
  };
}
