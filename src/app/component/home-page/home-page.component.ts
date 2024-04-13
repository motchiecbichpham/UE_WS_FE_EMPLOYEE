import { Component, HostListener, OnInit } from '@angular/core';
import { Job, JobContractType } from '../../type/job';
import { JobService } from '../../service/job.service';
import { NotificationService } from '../../service/notification.service';
import { Router } from '@angular/router';
import { CONSTANT } from '../../api/constants';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  jobList: Job[] = [];
  dataJobs: Job[] = [];
  nullJob: Job = {
    company: {
      id: undefined,
      name: '',
      contact: '',
      address: '',
      city: '',
      introduction: '',
      description: '',
      password: '',
    },
    title: '',
    description: '',
    salary: 0,
    workplace: '',
    yearOfExp: 0,
    contract: '',
    expiredDate: new Date(),
    status: '',
    amountHiring: 0,
    id: -1,
  };
  cities = CONSTANT.cities;
  contracts = [];
  constructor(
    private jobService: JobService,
    private notiService: NotificationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.jobService.getJobs().subscribe(
      (data) => {
        this.jobList = data;
        this.dataJobs = data;
        this.setNumberOfItems(window.innerWidth, this.dataJobs);
      },
      (error) => {
        this.notiService.showNotification('Load jobs failed', 'Close', false);
      }
    );
  }

  onViewJob(job: Job) {
    this.router.navigate(['/job-detail', job.id]);
  }
  setNumberOfItems(width: number, listJ: Job[]): void {
    if (width < 968) {
      this.jobList = listJ;
    } else if (width >= 968 && width < 1432) {
      if (listJ.length % 2 == 1) {
        this.jobList = [...listJ, this.nullJob];
      }
    } else {
      if (listJ.length % 3 == 1) {
        this.jobList = [...listJ, this.nullJob, this.nullJob];
      } else if (listJ.length % 3 == 2) {
        this.jobList = [...listJ, this.nullJob];
      }
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setNumberOfItems(event.target.innerWidth, this.dataJobs);
  }
}
