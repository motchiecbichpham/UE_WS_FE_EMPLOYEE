import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../type/job';
import { API_ENDPOINTS } from '../api/api.config';
import { Application } from '../type/application';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    const endpoint = API_ENDPOINTS.job.getJobs;
    return this.http.get<Job[]>(endpoint);
  }
  getJobById(
    jobId: number,
    candidateId: number
  ): Observable<{ isApplied: boolean; job: Job }> {
    const endpoint = API_ENDPOINTS.job.getJob;
    return this.http.get<{ isApplied: boolean; job: Job }>(endpoint, {
      params: { jobId: jobId, candidateId: candidateId },
    });
  }
  upload(file: File, jobId: number, candidateId: number): Observable<string> {
    const formData: FormData = new FormData();

    formData.append('resume', file);
    formData.append('jobId', jobId.toString());
    formData.append('candidateId', candidateId.toString());

    return this.http.post<string>(API_ENDPOINTS.job.applyJob, formData);
  }

  getApplications(candidateId: number): Observable<Application[]> {
    const endpoint = API_ENDPOINTS.job.applications;

    return this.http.get<Application[]>(endpoint, {
      params: { candidateId: candidateId },
    });
  }

  deleteApplication(
    candidateId: number,
    applicationId: number
  ): Observable<any> {
    const endpoint = API_ENDPOINTS.job.applications;

    return this.http.delete<any>(endpoint, {
      params: {
        applicationId: applicationId,
        candidateId: candidateId,
      },
    });
  }
}
