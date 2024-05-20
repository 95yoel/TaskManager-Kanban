import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { KanbanColumn } from '../../models/columns';
import {CdkDragDrop,moveItemInArray,transferArrayItem,CdkDrag,CdkDropList} from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks';
import { Priorities } from '../../models/priorities';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public columns: KanbanColumn[] = [];
  public connectedTo: string[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {

    this.taskService.getColumns().subscribe((columns) => {
      this.columns = columns;
      this.connectedTo = this.columns.map((_, index) => `cdk-drop-list-${index}`);
    });
    
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

