import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  submitFile(fileInput: HTMLInputElement): void {
    const file = fileInput.files?.item(0);
    if (file) {
      this.fileSelected.emit(file);
    }
    this.dialogRef.close();
  }
}
