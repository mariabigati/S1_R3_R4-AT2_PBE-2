import { Pessoa } from "./pessoa.model";

export class Aluno extends Pessoa {
  private _id?: number;
  private _matricula: string = "";
  private _curso: string = "";
  private _mediaFinal: number = 0;

  constructor(
    nome: string,
    email: string,
    matricula: string,
    curso: string,
    mediaFinal: number,
    id?: number,
  ) {
    super(nome, email);
    this.Matricula = matricula;
    this.Curso = curso;
    this.MediaFinal = mediaFinal;
    this._id = id;
  }

  //getters
  public get Id(): number | undefined {
    return this._id;
  }

  public get Matricula(): string {
    return this._matricula;
  }

  public get Curso(): string {
    return this._curso;
  }

  public get MediaFinal(): number {
    return this._mediaFinal;
  }

  //setters

  public set Id(value: number) {
    this._id = value;
  }

  public set Matricula(value: string) {
    this._validarMatricula(value);
    this._matricula = value;
  }

  public set Curso(value: string) {
    this._validarCurso(value);
    this._curso = value;
  }

  public set MediaFinal(value: number) {
    this._validarMedia(value);
    this._mediaFinal = value;
  }

  mostrarDados(): string {
    //temp mostrarDados
    return this._nome;
  }

  estaAprovado(value: number):boolean {
    if(value >= 7) {
        return true;
    }
    return false;
  }

  //insert e update

  public static inserir(
    nome: string,
    email: string,
    matricula: string,
    curso: string,
    mediaFinal: number,
  ): Aluno {
    return new Aluno(nome, email, matricula, curso, mediaFinal);
  }

  public static alterar(
    nome: string,
    email: string,
    matricula: string,
    curso: string,
    mediaFinal: number,
    id: number
  ): Aluno {
    return new Aluno(nome, email, matricula, curso, mediaFinal, id);
  }

  //validações

  private _validarMatricula(value: string): void {
    if (!value || value.trim().length < 10 || value.trim().length > 10) {
      throw new Error("A matrícula deve ter 10 caractéres.");
    }
  }

  private _validarCurso(value: string): void {
    if (!value || value.trim().length < 3) {
      throw new Error("O curso deve ter ao menos 3 caractéres.");
    }

    if (!value || value.trim().length > 100) {
      throw new Error("O curso não deve exceder 100 caractéres.");
    }
  }

  private _validarMedia(value: number): void {
    if (!value || isNaN(value)) {
      throw new Error("A média deve ser um número.");
    }

    if(value < 0) {
        throw new Error("A média não pode ser negativa.");
    }

    if(value > 10) {
        throw new Error("A média não pode maior que 10.");
    }
  }

  
}
