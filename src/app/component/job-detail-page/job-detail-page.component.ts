import { Component } from '@angular/core';

@Component({
  selector: 'app-job-detail-page',
  templateUrl: './job-detail-page.component.html',
  styleUrl: './job-detail-page.component.css',
})
export class JobDetailPageComponent {
  job: any = {
    title: 'Job Title 1',
    company: 'Company 1',
    description: 'Description 1',
    salary: '1000$',
    location: 'Paris',
    experience: '1 - 3 years',
  };
}
