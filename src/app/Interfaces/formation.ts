export interface Formation {
    id?: number;
    titre: string;
    description: string;
    chargeHoraire: number;
    programme: string;
    niveau: 'débutant' | 'intermédiaire' | 'avancé';
    motsCles: string[]; // tags
    categories: string[]; // categories
    img : string ;
}

export interface FormationDemande {
    id ? : number;
    objet : string ;
    explication : string ;
}
