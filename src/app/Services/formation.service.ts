import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formation } from '../Interfaces/formation';
import { Observable, Subject, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private http: HttpClient) { }
  private url: string = 'http://localhost:3000/Formations';
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}

  //////////////////////////////////////////////
  /**
  * Variables
  * 
  */

  formationsArrayEdited = new Subject<Formation[]>();

  private formations : Formation[] = [];



  //changer String to tab specialites

changeToSpe(st : string): string[] {
  const wordsArray = st.split(',').map(word => word.trim());

  const wordArray: string[] = wordsArray.map(libelle => (libelle));

  return wordArray;

}

changeSpeToSt(st : string[]): string  {
  return st.map(s => s).join(', ');
}





  // getAllFormation(): Observable<Formation[]> {
  //   return this.http.get<Formation[]>(`${this.url}`);
  // }

  getFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.url, this.options) 
      .pipe(
        map(formations => {
          this.formations = formations;
          this.formationsArrayEdited.next([...formations]);
          return [...formations]; // Return a copy of the formations
        }),
        catchError(error => {
          console.error('Error fetching formations:', error);
          return [];
        })
      );
  }

  // getFormationById(id: string) {
  //   return this.http.get<Formation>(`${this.url}/${id}`);
  // }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.url}/${id}`, this.options) 
      .pipe(
        map(formations => formations), // Extract the first (and hopefully only) formation
        catchError(error => {
          console.error('Error fetching formation:', error);
          throw error; // Rethrow to propagate the error to subscribers
        })
      );
  }



  addFormation(formation: Formation) {
    return this.http.post<Formation>(`${this.url}`, formation).pipe(
      tap(formation => {
        this.formations.push(formation);
        this.formationsArrayEdited.next([...this.formations]);
      }),
      catchError(error => {
        console.error('Error fetching sessions:', error);
        throw error;
      })
    );
  }

  updateFormation(id: string, formation: Formation) {
    return this.http.patch<Formation>(`${this.url}/${id}`, formation).pipe(
      tap(formation => {
        this.formations.map(f => (f.id === formation.id ? formation : f) );
        this.formationsArrayEdited.next([...this.formations]);
      }),
      catchError(error => {
        console.error('Error fetching sessions:', error);
        throw error;
      })
    );
  }

  // deleteFormation(id: string) {
  //   return this.http.delete(`${this.url}/${id}`);
  //   // update or delete all session under this formations
  // }



}
