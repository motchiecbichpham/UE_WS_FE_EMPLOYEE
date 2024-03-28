export type Job = {
  company: {
    id: number;
    name: string
  };
  title: string;
  description: string;
  salary: string;
  workplace: string;
  yearOfExp: number;
  contract: string;
  expiredDate: Date;
  status: number;
  amountHiring: number;
};
