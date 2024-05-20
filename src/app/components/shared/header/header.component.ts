import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../../board/add/add.component';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  private readonly dialog = inject(MatDialog)
  private readonly taskService = inject(TaskService)

  addTask(){
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result);
      }
    });
  }

}
