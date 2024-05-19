import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export type KanbanColumn ={
  label:string
  list:string[]
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  public columns:KanbanColumn[]   = []

  public pendingTasks:string[]    = ['Limpiar']
  public inProcessTasks:string[]  = ['Fregar']
  public doneTasks:string[]       = ['Recoger']

  private readonly initColumns = () =>{
    this.columns = [
      {label:'Pendiente',list:this.pendingTasks},
      {label:'En proceso',list:this.inProcessTasks},
      {label:'Finalizado',list:this.doneTasks}
    ]
  }

  ngOnInit(): void {
    this.initColumns()
    
  }



}
