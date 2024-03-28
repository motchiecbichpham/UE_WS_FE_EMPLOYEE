import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Job } from '../type/job';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  getJobs(): Observable<Job[]> {
    const endpoint = this.apiService.getJobListEndpoint();
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Methods': 'POST, GET, PUT', // or specify the origin you expect
    });
    return this.http.get<any[]>(endpoint, { headers: headers });
  }
}
