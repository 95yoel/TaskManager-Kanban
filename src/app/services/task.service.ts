import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KanbanColumn } from '../models/columns';
import { Task } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private columns: KanbanColumn[] = [
    { label: 'PENDING', list: [] },
    { label: 'IN_PROCESS', list: [] },
    { label: 'FINALIZED', list: [] }
  ];

  private columnsSubject = new BehaviorSubject<KanbanColumn[]>(this.columns);

  getColumns() {
    return this.columnsSubject.asObservable();
  }

  updateColumns(columns: KanbanColumn[]) {
    this.columns = columns;
    this.columnsSubject.next(this.columns);
  }

  addTask(task: Task) {
    this.columns[0].list.push(task);
    this.columnsSubject.next(this.columns);
  }

  deleteTask(taskId: number) {
    this.columns.forEach(column => {
      const index = column.list.findIndex(task => task.id === taskId);
      if (index !== -1) {
        column.list.splice(index, 1);
      }
    });
    this.columnsSubject.next(this.columns);
  }

  updateTask(updatedTask: Task) {
    this.columns.forEach(column => {
      const index = column.list.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        column.list[index] = updatedTask;
      }
    });
    this.columnsSubject.next(this.columns);
  }


  
}
