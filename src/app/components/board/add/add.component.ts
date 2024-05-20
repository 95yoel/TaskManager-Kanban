import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  public taskName = '';

  private readonly dialogRef = inject(MatDialogRef<AddComponent>);

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    if (this.taskName.trim()) {
      this.dialogRef.close(this.taskName);
    }
  }
}
