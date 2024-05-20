import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KanbanColumn } from '../models/columns';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private columns: KanbanColumn[] = [
    { label: 'Pendiente', list: ['Datos de prueba1', 'Datos de prueba2'] },
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


  
}
