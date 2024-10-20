import { Livro } from '../modelo/Livro';

export class ControleLivro {
    private livros: Array<Livro> = [
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

    public obterLivros(): Array<Livro> {
        console.log("Obtendo livros:", this.livros);
        return this.livros;
    }

    public incluir(livro: Livro): void {
        const codigoMaisAlto = this.livros.reduce((max, livro) => Math.max(max, livro.codigo), 0);
        console.log("Código mais alto antes da inclusão:", codigoMaisAlto);

        livro.codigo = codigoMaisAlto + 1;
        console.log("Código do novo livro:", livro.codigo);

        this.livros.push(livro);
        console.log("Livro incluído:", livro);
        console.log("Lista de livros após inclusão:", this.livros);
    }

    public excluir(codigo: number): void {
        const indice = this.livros.findIndex(livro => livro.codigo === codigo);
        console.log("Tentando excluir livro com código:", codigo);
        
        if (indice !== -1) {
            this.livros.splice(indice, 1);
            console.log("Livro excluído. Índice:", indice);
        } else {
            console.log("Livro não encontrado com código:", codigo);
        }
        
        console.log("Lista de livros após exclusão:", this.livros);
    }
}