import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../Interfaces/session';
import { Subject, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  private url: string = 'http://localhost:3000/SessionFormation';
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}

  //////////////////////////////////////////////
  /**
  * Variables
  * 
  */

  sessionsArrayEdited = new Subject<Session[]>();

  private sessions : Session[] = [];

  // functions

  getAllSessions() {
    return this.http.get<Session[]>(`${this.url}`,this.options).pipe(
      map(sessions => {
        this.sessions = sessions;
        this.sessionsArrayEdited.next([...sessions]);
        return [...sessions]; // Return a copy of the sessions
      }),
      catchError(error => {
        console.error('Error fetching sessions:', error);
        return [];
      })
    );
  }


  getSessionsById(id: string) {
    return this.http.get<Session>(`${this.url}/${id}`, this.options).pipe(
      map(sessions => sessions), // Extract the first (and hopefully only) 
      catchError(error => {
        console.error('Error fetching sessions:', error);
        throw error; // Rethrow to propagate the error to subscribers
      })
    );
  }

  


  getSessionsByFormation(id: string) {
    return this.http.get<Session[]>(`${this.url}?formation=${id}`).pipe(
      map(sessions => {        
        return sessions; 
      }),
      catchError(error => {
        console.error('Error fetching sessions:', error);
        return [];
      })
    );
  }


  ajouterCandidat(id : string , session : Session , idCandidat : string){
    session.candidats.push(+idCandidat);
    this.updateSession(id,session);

  }


  addSession(session: Session) {
    return this.http.post<Session>(`${this.url}`, session).pipe(
      tap(session => {
        this.sessions.push(session);
        this.sessionsArrayEdited.next([...this.sessions]);
      }),
      catchError(error => {
        console.error('Error fetching sessions:', error);
        throw error;
      })
    );
  }
 

  updateSession(id: string, session: Session) {
    return this.http.put<Session>(`${this.url}/${id}`, session).pipe(
      tap(sessionEdited => {
        this.sessions.map(s => (s.id===sessionEdited.id ? sessionEdited : s )  ); 
        this.sessionsArrayEdited.next([...this.sessions]);
      }),
      catchError(error => {
        console.error('Error fetching sessions:', error);
        throw error;
      })
    );
  }


  deleteSession(id: string) {
    return this.http.delete<Session>(`${this.url}/${id}`).pipe(
      tap(sessionDeleted => {
        this.sessions.filter(s => s.id!==sessionDeleted.id   ); 
        this.sessionsArrayEdited.next([...this.sessions]);
      }),
      catchError(error => {
        console.error('Error fetching sessions:', error);
        throw error;
      })
    );
  }


 






}
