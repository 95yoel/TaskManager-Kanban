import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Task } from '../../../models/tasks';
import { Priorities } from '../../../models/priorities';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
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
