export class Todo {
    public id: number;
    public texto: string;
    public completado: boolean;

    constructor(texto: string) {
        this.id = new Date().getTime() + Math.floor(Math.random() * 100);
        this.texto = texto;
        this.completado = false;
    }

}