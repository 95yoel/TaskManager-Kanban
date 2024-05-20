import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/tasks';
import { Priorities } from '../../../models/priorities';
import { TranslationPipe } from '../../../pipe/translation.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,TranslationPipe,AsyncPipe],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  public taskName = '';
  public taskDescription = '';
  public taskPriority: Priorities = Priorities.medium;

  private readonly dialogRef = inject(MatDialogRef<EditComponent>);
  private readonly data = inject(MAT_DIALOG_DATA);

  Priorities = Priorities;

  ngOnInit(): void {
    if (this.data) {
      this.taskName = this.data.name;
      this.taskDescription = this.data.description;
      this.taskPriority = this.data.priorities;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.taskName.trim()) {
      const updatedTask: Task = {
        ...this.data,
        name: this.taskName,
        description: this.taskDescription,
        priorities: this.taskPriority,
      };
      this.dialogRef.close(updatedTask);
    }
  }
}
