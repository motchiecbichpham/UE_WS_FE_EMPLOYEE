import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Candidate } from '../type/candidate';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  signup(candidate: Candidate): Observable<any> {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'POST, GET, PUT', // or specify the origin you expect
    });
    const endpoint = this.apiService.getAuthSignupEndpoint();
    return this.http.post<any>(endpoint, candidate, { headers: headers });
  }
}
