import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../type/candidate';
import { API_ENDPOINTS } from '../api/api.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(candidate: Candidate): Observable<Candidate> {
    const endpoint = API_ENDPOINTS.auth.signup;
    return this.http.post<Candidate>(endpoint, candidate);
  }
  login(
    candidate: Candidate
  ): Observable<{ token: string; candidate: Candidate }> {
    const endpoint = API_ENDPOINTS.auth.login;
    return this.http.post<{ token: string; candidate: Candidate }>(
      endpoint,
      candidate,
      {
        responseType: 'json',
      }
    );
  }
  updateProfile(candidate: Candidate): Observable<Candidate> {
    const endpoint = API_ENDPOINTS.auth.getCandidate + `${candidate.id}`;
    return this.http.put<Candidate>(endpoint, candidate, {
      responseType: 'json',
    });
  }
}
