import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient ) { }

  // envirement
  private url = "http://localhost:3000/login";

  // function


  // admin

  loginAdmin(email: string, password: string): Observable<boolean > {
    return this.http.post<{ accessToken: string, user: any }>(`${this.url}`, { email, password })
      .pipe(
        map( (response) => {
          if (response.user.role !== 'admin') {
            return false; // Admin login allowed
          }
  
          // Store login information for successful login
          sessionStorage.setItem("accessToken", response.accessToken);
          sessionStorage.setItem("user", JSON.stringify(response.user));
  
          return true; // Login successful
        }),
        tap(result => {
          console.log(result); // Log the login result (true or false)
          console.log(JSON.parse(sessionStorage.getItem("user")!).role);
          
        }),
        catchError(error => {
          console.error(error);
          return of(false); // Return false in case of error
        })
      );
  }















  // loginAdmin(email: string, password: string) {
  //   let resultat = true;
  //   this.http.post<{ accessToken: string, user: any }>(`${this.url}`, { email, password }).subscribe({
  //     next: (res) => {
  //       console.log(res)
        
  //       if(res.user.role != 'admin'){
  //         resultat = false;
  //       }
  //       else{
  //         sessionStorage.setItem("accessToken", res.accessToken);
  //         sessionStorage.setItem("user", JSON.stringify(res.user))
  //       }        
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       console.log("there is an error");
        
  //       resultat=false;
  //     }
  //   });

  //   return resultat ;  
  // }
  
  // candidat ou formateur////////////////////////////////////////////////////////

  // async loginUser(email: string, password: string): Promise<boolean> {
  //   let resultat = true;
  //   // console.log("email : "+email+"  password : " + password);
    
  //   this.http.post<{ accessToken: string, user: any }>(`${this.url}`, { email, password }).subscribe({
  //     next: (res) => {
  //       console.log(res)
        
  //       if(res.user.role == 'admin'){
  //         resultat = false;
  //       }
  //       else{
  //         sessionStorage.setItem("accessToken", res.accessToken);
  //         sessionStorage.setItem("user", JSON.stringify(res.user))
  //       }        
  //     },
  //     error: (err) => {
  //       console.error(err)
  //       console.log("there is an error");
  //       resultat=false;
        
  //     }
  //   });

  //   console.log(resultat);
    
  //   return resultat ;
  // }


  // async loginUser(email: string, password: string): Promise<boolean> {
  //   try {
  //     const response = await this.http.post<{ accessToken: string, user: any }>(`${this.url}`, { email, password });
  
  //     if (  response.user.role === 'admin') {
  //       return false; // Admin login not allowed
  //     }
  
  //     // Store login information for successful login
  //     sessionStorage.setItem("accessToken", response.accessToken);
  //     sessionStorage.setItem("user", JSON.stringify(response.user));
  
  //     return true; // Login successful
  
  //   } catch (error) {
  //     console.error(error);
  //     return false; // Login failed due to error
  //   }
  // }


  loginUser(email: string, password: string): Observable<boolean > {
    return this.http.post<{ accessToken: string, user: any }>(`${this.url}`, { email, password })
      .pipe(
        map( (response) => {
          if (response.user.role === 'admin') {
            return false; // Admin login not allowed
          }
  
          // Store login information for successful login
          sessionStorage.setItem("accessToken", response.accessToken);
          sessionStorage.setItem("user", JSON.stringify(response.user));
  
          return true; // Login successful
        }),
        tap(result => {
          console.log(result); // Log the login result (true or false)
          console.log(JSON.parse(sessionStorage.getItem("user")!).role);
          
        }),
        catchError(error => {
          console.error(error);
          return of(false); // Return false in case of error
        })
      );
  }



}
