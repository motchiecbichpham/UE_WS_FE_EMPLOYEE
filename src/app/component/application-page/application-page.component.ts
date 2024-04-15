import { Component, OnInit } from '@angular/core';
import { Application } from '../../type/application';
import { JobService } from '../../service/job.service';
import { NotificationService } from '../../service/notification.service';
import { Candidate } from '../../type/candidate';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css',
})
export class ApplicationPageComponent implements OnInit {
  applications: Application[] = [];
  profileCandidate: Candidate | undefined;
  constructor(
    private jobService: JobService,
    private notiService: NotificationService
  ) {}
  ngOnInit(): void {
    const candidate = localStorage.getItem('candidateProfile');
    this.profileCandidate = candidate ? JSON.parse(candidate) : null;
    this.jobService.getApplications(this.profileCandidate?.id || -1).subscribe(
      (data) => {
        if (data) {
          this.applications = data;
        }
      },
      (error) => {
        this.notiService.showNotification(
          'Load applications failed',
          'Close',
          false
        );
      }
    );
  }

  deleteApplication(id: number): void {
    if (this.profileCandidate) {
      this.jobService.deleteApplication(this.profileCandidate.id, id).subscribe(
        (data) => {
          this.applications = this.applications.filter(
            (item) => item.id !== id
          );
          this.notiService.showNotification(
            'Delete application success',
            'Close'
          );
        },
        (error) => {
          this.notiService.showNotification(
            'Delete application failed',
            'Close',
            false
          );
        }
      );
    }
  }
}
