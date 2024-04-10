import { Candidate } from './candidate';
import { Job } from './job';

export type Application = {
  id: number;
  job: Job;
  candidate: Candidate;
  resumeName: string;
};
