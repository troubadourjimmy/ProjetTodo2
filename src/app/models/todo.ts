export class Todo {
    name?:string;
    description?:string;
    done:Boolean;
    //id: string;

    constructor(name:string, description:string) {
        this.name = name;
        this.description = description;
        //this.id = this.id = '_'+Math.random().toString(36).substr(2,9);
        this.done =false;
    }
}
