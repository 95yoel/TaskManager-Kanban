import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KanbanColumn } from '../../models/columns';
import {CdkDragDrop,moveItemInArray,transferArrayItem,CdkDrag,CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public columns: KanbanColumn[] = [];

  public inProcessTasks: string[] = [];
  public pendingTasks: string[] = ['Datos de prueba1', 'Datos de prueba2'];
  public doneTasks: string[] = [];

  public connectedTo: string[] = [];

  private readonly initColumns = (): KanbanColumn[] => {
    return this.columns = [
      { label: 'Pendiente', list: this.pendingTasks },
      { label: 'En proceso', list: this.inProcessTasks },
      { label: 'Finalizado', list: this.doneTasks }
    ];
  }

  ngOnInit(): void {
    this.initColumns();
    this.connectedTo = this.columns.map((_, index) => `cdk-drop-list-${index}`);
  }

  drop(event: CdkDragDrop<string[]>) {
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
  }
}

