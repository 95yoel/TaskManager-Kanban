import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/tasks';
import { Priorities } from '../../../models/priorities';
import { TranslationPipe } from "../../../pipe/translation.pipe";
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-add',
    standalone: true,
    templateUrl: './add.component.html',
    styleUrl: './add.component.scss',
    imports: [FormsModule, MatFormFieldModule, TranslationPipe,AsyncPipe]
})
export class AddComponent {
  public taskName = '';
  public taskDescription = '';
  public taskPriority: Priorities = Priorities.medium;

  private readonly dialogRef = inject(MatDialogRef<AddComponent>);

  Priorities = Priorities;

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.taskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        name: this.taskName,
        description: this.taskDescription,
        priorities: this.taskPriority,
      };
      this.dialogRef.close(newTask);
    }
  }
}
