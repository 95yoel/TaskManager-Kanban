import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KanbanColumn } from '../../models/columns';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit{
  public columns:   KanbanColumn[] = []

  public inProcessTasks:  string[] = []
  public pendingTasks:    string[] = ['Datos de prueba1','Datos de prueba2']
  public doneTasks:       string[] = []

  private readonly initColumns = ():KanbanColumn[] =>{
    return this.columns = [
      {label:'Pendiente',list:this.pendingTasks},
      {label:'En proceso',list:this.inProcessTasks},
      {label:'Finalizado',list:this.doneTasks}
    ]
  }

  ngOnInit(): void {
    this.initColumns()
    
  }



}
