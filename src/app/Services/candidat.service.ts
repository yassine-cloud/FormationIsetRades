import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidat } from '../Interfaces/candidat';
import { Observable, Subject, catchError, map, tap } from 'rxjs';
import { LoginService } from './login.service';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  constructor(private http: HttpClient , private login : LoginService , private conn:ConnexionService) { }
  private url: string = 'http://localhost:3000';


  //////////////////////////////////////////////
  /**
  * Variables
  * 
  */

  candidatsArrayEdited = new Subject<Candidat[]>();

  private candidats : Candidat[] = [];

  // functions

  register(candidat: Candidat):Observable<boolean> {
    let pass = candidat.password; 
    return this.http.post<{ accessToken: string, user: Candidat }>(`${this.url}/register`, candidat).pipe(
      map(
        (log) =>{
          let res : boolean = true;
          this.login.loginUser(log.user.email,pass).subscribe(
            (isLogged)=>{
              if (this.conn.controle()){
                res = true
              }
              else{
                res = false;
              }
            }
          )

          return res;

        }
      ),
      catchError(error => {
        console.error('Error Connexion:', error);
        throw error;
      })
  
    )
  }

  registerParAdmin(candidat: Candidat):Observable<Candidat> {
    let pass = candidat.password; 
    return this.http.post<{ accessToken: string, user: Candidat }>(`${this.url}/register`, candidat).pipe(
      map(
        (log) =>{
          return log.user
        }
      ),
      catchError(error => {
        console.error('Error Connexion:', error);
        throw error;
      })
  
    )
  }
  // login(email: string, password: string) {
  //   return this.http.post<{ accessToken: string, user: Candidat }>(`${this.url}/login`, { email, password })
  // }

  getAllCandidats() {
    return this.http.get<Candidat[]>(`${this.url}/users?role=candidat`).pipe(
      map(candidats => {
        this.candidats = candidats;
        this.candidatsArrayEdited.next([...candidats]);
        return [...candidats]; // Return a copy of the 
      }),
      catchError(error => {
        console.error('Error fetching candidats:', error);
        return [];
      })
    );
  }


  getCandidatById(id: string) {
    return this.http.get<Candidat>(`${this.url}/users/${id}`).pipe(
      map(candidats => {return candidats}), // Extract the first (and hopefully only) 
      catchError(error => {
        console.error('Error fetching candidats:', error);
        throw error; // Rethrow to propagate the error to subscribers
      })
    );
  }


  updateCandidat(id: string, candidat: Candidat) {
    return this.http.patch<Candidat>(`${this.url}/users/${id}`, candidat).pipe(
      tap(candidatEdited => {
        this.candidats.map(s => (s.id===candidatEdited.id ? candidatEdited : s )  ); 
        this.candidatsArrayEdited.next([...this.candidats]);
      }),
      catchError(error => {
        console.error('Error fetching candidats:', error);
        throw error;
      })
    );
  }

  deleteCandidat(id: number) {
    return this.http.delete<Candidat>(`${this.url}/users/${id}`).pipe(
      tap(candidatDeleted => {
        this.candidats.filter(s => s.id!==candidatDeleted.id   ); 
        this.candidatsArrayEdited.next([...this.candidats]);
      }),
      catchError(error => {
        console.error('Error fetching candidats:', error);
        throw error;
      })
    );
  }
}
