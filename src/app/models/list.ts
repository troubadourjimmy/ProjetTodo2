import { Todo } from "./todo";

export class List {
    name:String;
    todos:Todo[]|null;
    id : string;

    constructor(name: string) {
        this.name =name;
        this.todos =[];
        //Les nombres générés par Math.random seront représentés sous forme de chaînes aléatoires
        //this.id = '_'+Math.random().toString(36).substr(2,9);
    }
}
