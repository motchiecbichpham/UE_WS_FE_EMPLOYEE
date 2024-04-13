import { Component, OnInit } from '@angular/core';
import { Job } from '../../type/job';
import { JobService } from '../../service/job.service';
import { NotificationService } from '../../service/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../layout/modal/modal.component';
import { Candidate } from '../../type/candidate';

@Component({
  selector: 'app-job-detail-page',
  templateUrl: './job-detail-page.component.html',
  styleUrl: './job-detail-page.component.css',
})
export class JobDetailPageComponent implements OnInit {
  job: Job | undefined;
  isApplied: boolean = false;
  jobList: Job[] = [];
  profileCandidate: Candidate | undefined;
  fileInfos?: Observable<any>;
  constructor(
    private jobService: JobService,
    private notiService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}
  id = null;
  ngOnInit(): void {
    const candidate = localStorage.getItem('candidateProfile');
    this.profileCandidate = candidate ? JSON.parse(candidate) : null;

    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.id &&
        this.profileCandidate &&
        this.jobService
          .getJobById(this.id, this.profileCandidate?.id)
          .subscribe(
            (data) => {
              if (data) {
                this.job = data.job;
                this.isApplied = data.isApplied;
              }
            },
            (error) => {
              this.notiService.showNotification(
                error.error.message,
                'Close',
                false
              );
            }
          );
      this.jobService.getJobs().subscribe(
        (data) => {
          if (data) {
            this.jobList = data.filter((item) => item.id != this.id);
            if (this.jobList.length > 5) {
              const shuffledList = this.jobList.sort(() => Math.random() - 0.5);
              this.jobList = shuffledList.slice(0, 5);
            }
          }
        },
        (error) => {
          this.notiService.showNotification('Load jobs failed', 'Close', false);
        }
      );
    });
  }

  onViewJob(job: Job) {
    this.router.navigate(['/job-detail', job.id]);
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.componentInstance.fileSelected.subscribe((file: File) => {
      this.upload(file);
    });
  }
  upload(file: File): void {
    if (file && this.job?.id && this.profileCandidate?.id) {
      this.jobService
        .upload(file, this.job.id, this.profileCandidate.id)
        .subscribe(
          (data) => {
            this.isApplied = true;
            this.notiService.showNotification(
              'Submit application successfully',
              'Close'
            );
          },
          (err) => {
            this.notiService.showNotification(
              'Submit application failed',
              'Close',
              false
            );
          }
        );
    }
  }
}
