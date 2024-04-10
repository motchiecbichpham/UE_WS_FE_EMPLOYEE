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
              this.job = data.job;
              this.isApplied = data.isApplied;
            },
            (error) => {
              this.notiService.showNotification('Load job failed', 'Close');
            }
          );
      this.jobService.getJobs().subscribe(
        (data) => {
          this.jobList = data.filter((item) => item.id != this.id);
        },
        (error) => {
          this.notiService.showNotification('Load jobs failed', 'Close');
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
      this.isApplied = true;
    });
  }
  upload(file: File): void {
    if (file && this.job?.id && this.profileCandidate?.id) {
      this.jobService
        .upload(file, this.job.id, this.profileCandidate.id)
        .subscribe(
          (data) => {},
          (err) => {}
        );
    }
  }
}
