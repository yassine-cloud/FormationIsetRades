export interface Formateur {
    id?:number;
    nom : string;
    prenom : string;
    email : string ;
    cin : string;
    tel:string;
    specialites : string[];
    password : string;
    role : string;
}
