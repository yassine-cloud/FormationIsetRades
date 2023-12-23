import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formateur } from '../Interfaces/formateur';
import { Observable, Subject, catchError, map, tap } from 'rxjs';
import { LoginService } from './login.service';
import { ConnexionService } from './connexion.service';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  constructor(private http: HttpClient , private login : LoginService , private conn:ConnexionService) { }
  private url: string = 'http://localhost:3000';


//////////////////////////////////////////////
  /**
  * Variables
  * 
  */

  formateursArrayEdited = new Subject<Formateur[]>();

  private formateurs : Formateur[] = [];

  // functions

// specialite
changeToSpe(sp : string): string[] {
  return sp.split(',').map(word => word.trim());
}

changeSpeToSt(sp : string[]): string  {
  return sp.join(', ');
}

// //noms des formateurs

// nomFormateurs( ids : number[] ) {
//   let tabNames : string[]=[]
//   let names : string ="";
//   return this.getAllFormateurs().pipe(
//     map(
//       (formateurs) => {
//         formateurs.forEach(element => {
//           if(  ids.includes(element.id!)  ){
//             tabNames.push(element.nom)
//           }
//         });

//         names = tabNames.join(", ");
//         return names;     
        
//       }
//     ),
//     catchError(error => {
//       console.error('Error Connexion:', error);
//       throw error;
//     })
//   )

// }

// 


  register(formateur: Formateur) {
    let pass = formateur.password
    return this.http.post<{ accessToken: string, user: Formateur }>(`${this.url}/register`, formateur).pipe(
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

  registerParAdmin(formateur: Formateur):Observable<Formateur> {
    let pass = formateur.password; 
    return this.http.post<{ accessToken: string, user: Formateur }>(`${this.url}/register`, formateur).pipe(
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
  //   return this.http.post<{ accessToken: string, user: Formateur }>(`${this.url}/login`, { email, password })
  // }

  getAllFormateurs() {
    return this.http.get<Formateur[]>(`${this.url}/users?role=formateur`).pipe(
      map(formateurs => {
        this.formateurs = formateurs;
        this.formateursArrayEdited.next([...formateurs]);
        return [...formateurs]; // Return a copy of the 
      }),
      catchError(error => {
        console.error('Error fetching formateurs:', error);
        return [];
      })
    );
  }


  getFormateurById(id: string) {
    return this.http.get<Formateur>(`${this.url}/users/${id}`).pipe(
      map(formateurs => formateurs), // Extract the first (and hopefully only) 
      catchError(error => {
        console.error('Error fetching formateurs:', error);
        throw error; // Rethrow to propagate the error to subscribers
      })
    );
  }

  
  updateFormateur(id: string, formateur: Formateur) {
    return this.http.patch<Formateur>(`${this.url}/users/${id}`, formateur).pipe(
      tap(formateurEdited => {
        this.formateurs.map(s => (s.id===formateurEdited.id ? formateurEdited : s )  ); 
        this.formateursArrayEdited.next([...this.formateurs]);
      }),
      catchError(error => {
        console.error('Error fetching formateurs:', error);
        throw error;
      })
    );
  }

  deleteFormateur(id: number) {
    return this.http.delete<Formateur>(`${this.url}/users/${id}`).pipe(
      tap(formateurDeleted => {
        this.formateurs.filter(s => s.id!==formateurDeleted.id   ); 
        this.formateursArrayEdited.next([...this.formateurs]);
      }),
      catchError(error => {
        console.error('Error fetching formateurs:', error);
        throw error;
      })
    );
  }



}
