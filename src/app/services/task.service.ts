import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KanbanColumn } from '../models/columns';
import { Task } from '../models/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private columns: KanbanColumn[] = [
    { label: 'Pendiente', list: [] },
    { label: 'En proceso', list: [] },
    { label: 'Finalizado', list: [] }
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


  
}
