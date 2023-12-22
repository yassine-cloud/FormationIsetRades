import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { FormationDemande } from '../Interfaces/formation';

@Injectable({
  providedIn: 'root'
})
export class FormationDemandeService {

  constructor(private http: HttpClient) { }
  private url: string = 'http://localhost:3000/FormationsDemandees';

  demandesArrayEdited = new Subject<FormationDemande[]>();

  private demandes : FormationDemande[] = [];


  getAllDemande(){
    return this.http.get<FormationDemande[]>(`${this.url}`).pipe(
      map(demandes => {
        this.demandes = demandes;
        this.demandesArrayEdited.next([...demandes]);
        return [...demandes]; // Return a copy of the sessions
      }),
      catchError(error => {
        console.error('Error fetching les Demandes : ', error);
        return [];
      })
    );
  }

  demander(formation: FormationDemande): Observable<boolean> {
    return this.http.post<FormationDemande>(`${this.url}`, formation).pipe(
      map( (formation)=> {
        this.demandes.push(formation);
        this.demandesArrayEdited.next([...this.demandes]);
        return true}  ),
      tap ( () => {
        console.log("Demande envoyée!"); } ),
      catchError( ( error ) =>  { console.error( error ); return of(false) ; } )  
    ) ;
  }

  supprimerDemande(demande : FormationDemande){

    return this.http.delete<FormationDemande>(`${this.url}/${demande.id}`).pipe(
      tap(demandeDeleted => {
        this.demandes.filter(d => d.id!==demandeDeleted.id  ); 
        this.demandesArrayEdited.next([...this.demandes]);
      }),
      catchError(error => {
        console.error('Error fetching sessions:', error);
        throw error;
      })
    );

  }


}
