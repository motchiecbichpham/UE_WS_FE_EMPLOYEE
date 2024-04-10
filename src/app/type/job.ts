import { Company } from './company';

export enum JobContractType {
  FullTime,
  PartTime,
  Temporary,
  Freelance,
  Internship,
}

export enum JobHiringStatus {
  Open,
  Closed,
  Cancelled,
}

export type Job = {
  company: Company;
  title: string;
  description: string;
  salary: number;
  workplace: string;
  yearOfExp: number;
  contract: string;
  expiredDate: Date;
  status: string;
  amountHiring: number;
  id: number;
};
