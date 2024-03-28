import { Component, HostListener } from '@angular/core';
import { Job } from '../../type/job';
import { JobService } from '../../service/job.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  jobList: Job[] = [
    {
      title: 'Job Title 1',
      company: {
        id: 1,
        name: 'Company 1',
      },
      description: 'Description 1',
      salary: 'string',
      workplace: 'string',
      yearOfExp: 2,
      contract: 'string',
      expiredDate: new Date(),
      status: 1,
      amountHiring: 1,
    },
  ];
  constructor(private jobService: JobService) {}
  ngOnInit(): void {
    this.jobService.getJobs().subscribe((data) => {
      this.jobList = data;
      console.log(data);
    });
  }
}
