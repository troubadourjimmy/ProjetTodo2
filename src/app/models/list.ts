import { Todo } from "./todo";

export class List {
    name:String;
    todos:Todo[]|null;
    id : string;
    owner:string;
    canRead: string[];
    canWrite: string[];

    constructor(name: string) {
        this.name =name;
        this.todos =[];
        this.canRead=[];
        this.canWrite =[];
        this.id = null;
    }
}
