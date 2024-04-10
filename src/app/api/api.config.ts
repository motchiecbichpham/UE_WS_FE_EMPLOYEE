import { environment } from '../../environments/environment.development';

export const API_ENDPOINTS = {
  auth: {
    signup: environment.apiUrl + '/sign-up',
    login: environment.apiUrl + '/login',
    getCandidate: environment.apiUrl + '/',
  },
  job: {
    postJob: environment.apiUrl + '/create-job',
    getJob: environment.apiUrl + '/job',
    getJobs: environment.apiUrl + '/jobs',
    applyJob: environment.apiUrl + '/apply-job',
    applications: environment.apiUrl + '/application'
  },
};
