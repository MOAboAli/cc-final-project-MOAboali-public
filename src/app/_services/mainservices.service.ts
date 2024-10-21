
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MainservicesService {

  private apiUrl = environment.API_URL; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  // Sign up

  signup(userData: any): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + "/signup", userData, { headers });
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  async uploadfile(file: File, url: string) {
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    try {
      this.http.put(url, file, { headers })
        .subscribe({
          next: async (response) => {
            console.log(response);

          },
          error: (error) => {
            console.log(error);
          }
        });



    } catch (error) {

    }

  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw new Error('Signup failed, please try again later. Error Message:' + error.message);
  }

  // Login 

  login(userData: any): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + "/login", userData, { headers });

  }

}
