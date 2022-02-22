export class Todo {
    name?:string;
    descrip?:string;
    status:Boolean;
    id: string;

    constructor(name:string, description:string) {
        this.name = name;
        this.descrip = description;
        this.id = this.id = '_'+Math.random().toString(36).substr(2,9);
        this.status =false;
    }
}
