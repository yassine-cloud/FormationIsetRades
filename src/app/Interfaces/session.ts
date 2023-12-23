export interface Session {
    id ?: number;
    formation: number; // id formation
    formateurs: number[]; // id formateurs max 2
    candidats: number[]; // id candidats max 15
    dateDebut: string;
    dateFin: string;
    planningSeances: string[]; // chaque jour a un ligne 
}

export interface SessionToRead {
    id ?: number;
    formation: number; // id formation
    titreFormation : string ;
    formateurs: number[]; // id formateurs max 2
    nomFormateurs:string[];
    candidats: number[]; // id candidats max 15
    nomCandidats: string[];
    dateDebut: string;
    dateFin: string;
    planningSeances: string[]; // chaque jour a un ligne 
}
