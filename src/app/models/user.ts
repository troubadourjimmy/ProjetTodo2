export class User {

    constructor( uid: string,
        email: string,
        displayName: string,
        photoURL: string,
        emailVerified: boolean){
        this.uid = uid
        this.email = email
        this.displayName = displayName
        this.photoURL =photoURL
        this.emailVerified = emailVerified
    }

    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    id : string
 }