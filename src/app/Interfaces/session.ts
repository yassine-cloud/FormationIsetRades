export interface Session {
    id : number;
    formation: number; // id formation
    formateurs: number[]; // id formateurs max 2
    candidats: number[]; // id candidats max 15
    dateDebut: Date;
    dateFin: Date;
    planningSeances: string[]; // chaque jour a un ligne 
}
