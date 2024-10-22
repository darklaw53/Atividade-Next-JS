import { Livro } from '../modelo/Livro';

const livros: Array<Livro> = [
    new Livro(2007, 1, 101, "Use a Cabeça!: Java", 
        "Use a Cabeça! Java é uma experiência completa de aprendizado em\nprogramação orientada a objetos (OO) e Java.", 
        "", ["Bert Bates", "Kathy Sierra"]),
    new Livro(1949, 2, 102, "Java, como Programar", 
        "Milhões de alunos e profissionais aprenderam programação e\ndesenvolvimento de software com os livros Deitel.", 
        "", ["Paul Deitel", "Harvey Deitel"]),
    new Livro(1899, 3, 103, "Core Java for the\nImpatient", 
        "Readers familiar with Horstmann's original, two-volume Core Java books\nwho are looking for a comprehensive, but condensed guide to all of the new\nfeatures and functions of Java SE 9 will learn how these new features impact\nthe language and core libraries.", 
        "Cay Horstmann", ["Cay Horstmann"])
];  

export class ControleLivro {
    public obterLivros(): Array<Livro> {
        return livros;
    }

    public incluir(livro: Livro): void {
        const novoCodigo = Math.max(...livros.map(livro => livro.codigo)) + 1;
        livro.codigo = novoCodigo;
        livros.push(livro);
    }

    public excluir(codigo: number): void {
        const indice = livros.findIndex(livro => livro.codigo === codigo);
        if (indice !== -1) {
            livros.splice(indice, 1);
        }
    }
}