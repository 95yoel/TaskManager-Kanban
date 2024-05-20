import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../../board/add/add.component';
import { TaskService } from '../../../services/task.service';
import { TranslationService } from '../../../services/translation.service';
import { TranslationPipe } from '../../../pipe/translation.pipe';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslationPipe,AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  currentLanguage: string = ''

  private readonly dialog = inject(MatDialog)
  private readonly taskService = inject(TaskService)
  private readonly translationService = inject(TranslationService)
  
  ngOnInit(){
    this.translationService.language$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  addTask(){
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.addTask(result);
      }
    });
  }

  changeLanguage() {
    const newLang = this.currentLanguage === 'en' ? 'es' : 'en';
    this.translationService.setLanguage(newLang);
  }

}
