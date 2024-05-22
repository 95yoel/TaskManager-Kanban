import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { KanbanColumn } from '../models/columns';


@Injectable({
  providedIn: 'root'
})
export class DataService extends Dexie {
  columns!: Table<KanbanColumn, string>;
  private readonly localStorageKey = 'kanban-data';

  constructor() {
    super('KanbanDB');
    this.version(1).stores({
      columns: '&label'
    });
    this.columns = this.table('columns');
  }

  async saveData(columns: KanbanColumn[]): Promise<void> {
    console.log('Saving data to localStorage and IndexedDB');
    localStorage.setItem(this.localStorageKey, JSON.stringify(columns));
    await this.columns.clear(); 
    await this.columns.bulkPut(columns);
  }

  async loadData(): Promise<KanbanColumn[]> {
    const localData = localStorage.getItem(this.localStorageKey);
    if (localData) {
      console.log('Loading data from localStorage');
      return Promise.resolve(JSON.parse(localData) as KanbanColumn[]);
    } else {
      console.log('Loading data from IndexedDB');
      const dbData = await this.columns.toArray();
      return dbData.length ? dbData : [];
    }
  }
}
