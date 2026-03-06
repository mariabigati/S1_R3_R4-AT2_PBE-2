import { Pessoa } from "./pessoa.model";

export class Professor extends Pessoa {
  private _id?: number;
  private _disciplina: string = "";
  private _cargaHoraria: number = 0;

  constructor(
    nome: string,
    email: string,
    disciplina: string,
    cargaHoraria: number,
    id?: number,
  ) {
    super(nome, email);
    this.Disciplina = disciplina;
    this.CargaHoraria = cargaHoraria;
    this._id = id;
  }

  //getters
  public get Id(): number | undefined {
    return this._id;
  }

  public get Disciplina(): string {
    return this._disciplina;
  }

  public get CargaHoraria(): number {
    return this._cargaHoraria;
  }

  //setters

  public set Id(value: number) {
    this._id = value;
  }

  public set Disciplina(value: string) {
    this._validarDisciplina(value);
    this._disciplina = value;
  }

  public set CargaHoraria(value: number) {
    this._validarCargaHr(value);
    this._cargaHoraria = value;
  }

  mostrarDados(): string {
    //temp mostrarDados
    return this._nome;
  }

  //insert e update

  public static inserir(
    nome: string,
    email: string,
    disciplina: string,
    cargaHoraria: number,
  ): Professor {
    return new Professor(nome, email, disciplina, cargaHoraria);
  }

  public static alterar(
    nome: string,
    email: string,
    disciplina: string,
    cargaHoraria: number,
    id: number,
  ): Professor {
    return new Professor(nome, email, disciplina, cargaHoraria, id);
  }

  //validações

  private _validarDisciplina(value: string): void {
    if (!value || value.trim().length < 3) {
      throw new Error("A disciplina deve ter ao menos 3 caractéres.");
    }

    if (!value || value.trim().length > 100) {
      throw new Error("A disciplina não deve exceder 100 caractéres.");
    }
  }

  private _validarCargaHr(value: number): void {
    if (value == null || value == undefined || isNaN(value)) {
      throw new Error("A carga horária deve ser um número.");
    }

    if (value <= 0) {
      throw new Error("A carga horária não pode ser negativa ou nula!");
    }
  }
}
