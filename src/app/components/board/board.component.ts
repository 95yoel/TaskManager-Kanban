import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { KanbanColumn } from '../../models/columns';
import {CdkDragDrop,moveItemInArray,transferArrayItem,CdkDrag,CdkDropList} from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks';
import { Priorities } from '../../models/priorities';
import { EditComponent } from './edit/edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag,MatIconModule],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public columns: KanbanColumn[] = [];
  public connectedTo: string[] = [];

  private readonly taskService = inject(TaskService)
  private readonly dialog = inject(MatDialog)

  ngOnInit(): void {

    this.taskService.getColumns().subscribe((columns) => {
      this.columns = columns;
      this.connectedTo = this.columns.map((_, index) => `cdk-drop-list-${index}`);
    });
    
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.taskService.updateColumns(this.columns);
  }

  editTask(taskId: number): void {
    const task = this.columns
      .flatMap(column => column.list)
      .find(task => task.id === taskId);
    if (task) {
      const dialogRef = this.dialog.open(EditComponent, {
        data: task
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.taskService.updateTask(result);
        }
      });
    }
  }

  getPriorityClass(priority: Priorities): string {
    switch (priority) {
      case Priorities.high:
        return 'high';
      case Priorities.medium:
        return 'medium';
      case Priorities.low:
        return 'low';
      default:
        return '';
    }
  }

  getPriorityLabel(priority: Priorities): string {
    return Priorities[priority];
  }
}

