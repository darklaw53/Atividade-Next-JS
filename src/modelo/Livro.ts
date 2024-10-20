export class Livro {
  codigo: number;
  codEditora: number;
  titulo: string;
  resumo: string;
  autor: string;
  ano: number;
  autores: Array<string>;

  constructor(ano: number, codigo: number, codEditora: number, titulo: string, resumo: string, autor: string, autores: Array<string> = []) 
  {
    this.codigo = codigo;
    this.codEditora = codEditora;
    this.titulo = titulo;
    this.resumo = resumo;
    this.autor = autor;
    this.ano = ano;
    this.autores = autores;
  }
}