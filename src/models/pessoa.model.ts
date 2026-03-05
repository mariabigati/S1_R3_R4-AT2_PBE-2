import { RowDataPacket } from "mysql2";

export interface IPessoa {
  mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {
  protected _nome: string = "";
  protected _email: string = "";

  constructor(nome: string, email: string) {
    this.Nome = nome;
    this._email = email;
  }

  //getters
  public get Nome(): string {
    return this._nome;
  }
  public get Email() {
    return this._email;
  }
  
  //setters
  public set Nome(value: string) {
    this._validarNome(value);
    this._nome = value;
  }

  public set Email(value: string) {
    this._validarEmail(value);
    this._email = value;
  }

  private _validarNome(value: string): void {
    if (!value || value.trim().length < 3) {
      throw new Error(`Nome deve ter ao menos 3 carácteres`);
    }

    if (value.trim().length > 100) {
      throw new Error("Nome deve ter no máximo 100 caracteres.");
    }
  }

  private _validarEmail(value: string): void {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!value || regex.test(value) == false) {
      throw new Error("E-mail inválido.");
    }

    if (value.trim().length > 100) {
      throw new Error("E-mail deve ter no máximo 100 caracteres.");
    }
  }

  abstract mostrarDados(): string;
}
