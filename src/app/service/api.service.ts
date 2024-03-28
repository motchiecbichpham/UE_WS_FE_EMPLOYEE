import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { API_ENDPOINTS } from '../api/api.config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor() {}

  // getAuthLoginEndpoint() {
  //   return `${this.baseUrl}/auth/login`;
  // }

  getAuthSignupEndpoint() {
    return `${this.baseUrl}` + API_ENDPOINTS.auth.signup;
  }

  getJobListEndpoint() {
    return `${this.baseUrl}` + API_ENDPOINTS.job.list;
  }
}
