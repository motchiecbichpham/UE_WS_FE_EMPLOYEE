import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Job } from '../../type/job';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  @Input() job: Job | undefined;
  @Output() viewClicked: EventEmitter<Job> = new EventEmitter<Job>();

  onViewClick() {
    this.viewClicked.emit(this.job);
  }
}
